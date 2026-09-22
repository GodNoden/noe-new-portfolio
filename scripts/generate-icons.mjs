#!/usr/bin/env node
/**
 * Rasterises `app/icon.svg` into every icon the site ships.
 *
 * `app/icon.svg` is the single source of truth: edit it, run this script, and
 * the PNG, the ICO and the Apple touch icon are all regenerated from it.
 *
 * Outputs:
 *   app/favicon.ico        16 + 32 + 48 px, for legacy browsers and Safari
 *   app/apple-icon.png     180 px, for iOS home screens
 *   public/icon-192.png    PWA / web manifest
 *   public/icon-512.png    PWA, GitHub avatar, social profiles
 *
 * Usage:
 *   pnpm icons:generate
 *
 * Rendering goes through sharp (librsvg), not a headless browser: rasterising
 * an SVG does not need Chromium, so the icons can be regenerated anywhere —
 * including CI — without `pnpm cv:setup`. The résumé pipeline is the one that
 * still needs the browser, because it wants a real print engine.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const source = path.join(root, 'app', 'icon.svg')

const ICO_SIZES = [16, 32, 48]

/** Builds a Vista-era ICO container that embeds PNG payloads directly. */
function buildIco(entries) {
    const header = Buffer.alloc(6)
    header.writeUInt16LE(0, 0) // reserved
    header.writeUInt16LE(1, 2) // type: 1 = icon
    header.writeUInt16LE(entries.length, 4)

    const directory = Buffer.alloc(16 * entries.length)
    let offset = 6 + directory.length

    entries.forEach((entry, index) => {
        const at = index * 16
        // 0 encodes 256 in the ICO directory, hence the guard.
        const dimension = entry.size >= 256 ? 0 : entry.size
        directory.writeUInt8(dimension, at + 0)
        directory.writeUInt8(dimension, at + 1)
        directory.writeUInt8(0, at + 2) // palette size
        directory.writeUInt8(0, at + 3) // reserved
        directory.writeUInt16LE(1, at + 4) // colour planes
        directory.writeUInt16LE(32, at + 6) // bits per pixel
        directory.writeUInt32LE(entry.png.length, at + 8)
        directory.writeUInt32LE(offset, at + 12)
        offset += entry.png.length
    })

    return Buffer.concat([header, directory, ...entries.map((e) => e.png)])
}

/**
 * Renders the SVG at an exact pixel size. The `density` multiplier makes
 * librsvg rasterise big and downscale, which gives smoother antialiasing than
 * rendering directly at 16 px. Alpha is preserved so the rounded corners stay
 * transparent instead of white.
 */
async function render(svg, size) {
    return sharp(Buffer.from(svg), { density: 720 })
        .resize(size, size, { fit: 'fill' })
        .png()
        .toBuffer()
}

async function main() {
    const svg = await readFile(source, 'utf8')

    const icoEntries = []
    for (const size of ICO_SIZES) {
        icoEntries.push({ size, png: await render(svg, size) })
    }

    const outputs = [
        [path.join(root, 'app', 'favicon.ico'), buildIco(icoEntries)],
        [path.join(root, 'app', 'apple-icon.png'), await render(svg, 180)],
        [path.join(root, 'public', 'icon-192.png'), await render(svg, 192)],
        [path.join(root, 'public', 'icon-512.png'), await render(svg, 512)],
    ]

    await mkdir(path.join(root, 'public'), { recursive: true })
    for (const [destination, data] of outputs) {
        await writeFile(destination, data)
        console.log(`✓ ${path.relative(root, destination)} (${(data.length / 1024).toFixed(1)} KB)`)
    }
}

/** Exported for `tests/icons.test.mjs`: the ICO container is pure byte work. */
export { buildIco, ICO_SIZES, render }

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
})
