#!/usr/bin/env node
/**
 * Judges a favicon the way the brand rules demand: rendered at 16 px over a
 * light AND a dark tab-bar colour, never from the big PNG.
 *
 * For every size/background pair it writes:
 *   - the true-size PNG (what the browser will actually show), and
 *   - a x8 nearest-neighbour zoom, so the pixel grid is visible to the eye,
 *
 * and it prints measured numbers instead of opinions: ink coverage and the
 * share of ink pixels keeping a WCAG contrast of 3:1 and 4.5:1 against the
 * background, plus a 16 px ASCII map for a quick structural read. Everything
 * is written to `metrics.md` next to the previews.
 *
 * Usage:
 *   node scripts/icon-previews.mjs [source.svg] [outDir]
 *
 * Defaults to `app/icon.svg` and `brand/propuesta-favicon/previews`. Renders
 * through sharp, like `scripts/generate-icons.mjs`, so no browser is needed.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const source = path.resolve(process.argv[2] ?? path.join(root, 'app', 'icon.svg'))
const outDir = path.resolve(
    process.argv[3] ?? path.join(root, 'brand', 'propuesta-favicon', 'previews'),
)

const SIZES = [16, 32, 64]
const BACKGROUNDS = [
    { id: 'claro', color: '#fafafa' },
    { id: 'oscuro', color: '#18181b' },
]
const ZOOM = 8

const hexToRgb = (hex) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
]

/** WCAG relative luminance of an sRGB triple. */
function luminance([r, g, b]) {
    const channel = (value) => {
        const s = value / 255
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    }
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function contrast(a, b) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (hi + 0.05) / (lo + 0.05)
}

/** Renders `svg` at `size` px flattened onto `background`, as RGBA rows. */
async function renderOn(svg, size, background) {
    const flattened = await sharp(Buffer.from(svg), { density: 720 })
        .resize(size, size, { fit: 'fill' })
        .flatten({ background })
        .png()
        .toBuffer()
    const { data, info } = await sharp(flattened).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    return { data, info }
}

async function main() {
    const svg = await readFile(source, 'utf8')
    await mkdir(outDir, { recursive: true })

    const report = [`# ${path.relative(root, source)} — medido a tamaño real`, '']

    for (const size of SIZES) {
        for (const background of BACKGROUNDS) {
            const { data } = await renderOn(svg, size, background.color)
            const bg = hexToRgb(background.color)

            let ink = 0
            let legible = 0
            let readable = 0
            let contrastSum = 0
            for (let i = 0; i < data.length; i += 4) {
                const ratio = contrast([data[i], data[i + 1], data[i + 2]], bg)
                if (ratio >= 1.05) {
                    ink += 1
                    contrastSum += ratio
                    if (ratio >= 3) legible += 1
                    if (ratio >= 4.5) readable += 1
                }
            }

            const total = size * size
            const share = (value) => `${((100 * value) / (ink || 1)).toFixed(1)}%`
            report.push(
                `## ${size}px sobre fondo ${background.id} (${background.color})`,
                '',
                `- Tinta: ${((100 * ink) / total).toFixed(1)}% del lienzo`,
                `- Contraste medio de la tinta: ${(contrastSum / (ink || 1)).toFixed(2)}:1`,
                `- Tinta legible (≥3:1): ${share(legible)} · confortable (≥4.5:1): ${share(readable)}`,
                '',
            )

            const name = `${path.basename(source, '.svg')}-${size}-${background.id}`
            const png = await sharp(Buffer.from(svg), { density: 720 })
                .resize(size, size, { fit: 'fill' })
                .flatten({ background: background.color })
                .png()
                .toBuffer()
            await writeFile(path.join(outDir, `${name}.png`), png)
            await sharp(png)
                .resize(size * ZOOM, size * ZOOM, { kernel: 'nearest', fit: 'fill' })
                .png()
                .toFile(path.join(outDir, `${name}-x${ZOOM}.png`))

            // ASCII map (only meaningful at 16 px): '#' ink, '.' background.
            if (size === 16) {
                const rows = []
                for (let y = 0; y < size; y += 1) {
                    let row = ''
                    for (let x = 0; x < size; x += 1) {
                        const i = (y * size + x) * 4
                        const ratio = contrast([data[i], data[i + 1], data[i + 2]], bg)
                        row += ratio >= 4.5 ? '#' : ratio >= 2 ? '+' : ratio >= 1.05 ? '-' : '.'
                    }
                    rows.push(row)
                }
                report.push('```', ...rows, '```', '')
            }
        }
    }

    const markdown = `${report.join('\n')}\n`
    await writeFile(path.join(outDir, 'metrics.md'), markdown)
    process.stdout.write(markdown)
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
})
