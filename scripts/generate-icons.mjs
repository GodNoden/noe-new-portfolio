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
 * Needs the same Chromium build as the CV pipeline, so run `pnpm cv:setup`
 * once on a fresh machine.
 */
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright'

const require = createRequire(import.meta.url)
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

async function main() {
    const svg = await readFile(source, 'utf8')

    const browser = await chromium.launch()
    const page = await browser.newPage()

    // `omitBackground` keeps the rounded corners transparent instead of white.
    await page.setContent(
        `<style>html,body{margin:0;background:transparent}img{display:block}</style>` +
            `<img id="icon" src="data:image/svg+xml;utf8,${encodeURIComponent(svg)}">`
    )
    await page.waitForFunction(() => {
        const img = document.getElementById('icon')
        return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0
    })

    const render = async (size) => {
        await page.setViewportSize({ width: size, height: size })
        await page.evaluate((s) => {
            const img = document.getElementById('icon')
            img.style.width = `${s}px`
            img.style.height = `${s}px`
        }, size)
        return page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } })
    }

    const icoEntries = []
    for (const size of ICO_SIZES) {
        icoEntries.push({ size, png: await render(size) })
    }

    const appleIcon = await render(180)
    const icon192 = await render(192)
    const icon512 = await render(512)

    await browser.close()

    const outputs = [
        [path.join(root, 'app', 'favicon.ico'), buildIco(icoEntries)],
        [path.join(root, 'app', 'apple-icon.png'), appleIcon],
        [path.join(root, 'public', 'icon-192.png'), icon192],
        [path.join(root, 'public', 'icon-512.png'), icon512],
    ]

    await mkdir(path.join(root, 'public'), { recursive: true })
    for (const [destination, data] of outputs) {
        await writeFile(destination, data)
        console.log(`✓ ${path.relative(root, destination)} (${(data.length / 1024).toFixed(1)} KB)`)
    }
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
})
