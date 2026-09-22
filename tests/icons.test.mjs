import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

import { buildIco, ICO_SIZES } from '../scripts/generate-icons.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8')

/* -------------------------------------------------------------------------- */
/* ICO container                                                              */
/* -------------------------------------------------------------------------- */

test('buildIco writes a well-formed ICO directory', () => {
    const entries = [
        { size: 16, png: Buffer.from('png-16') },
        { size: 32, png: Buffer.from('png-32!!') },
        { size: 256, png: Buffer.from('png-256') },
    ]
    const ico = buildIco(entries)

    assert.equal(ico.readUInt16LE(0), 0, 'reserved field')
    assert.equal(ico.readUInt16LE(2), 1, 'type must be 1 (icon)')
    assert.equal(ico.readUInt16LE(4), entries.length)

    // 0 is the ICO encoding for 256 px; any other size is written literally.
    assert.equal(ico[6], 16, 'first directory entry width')
    assert.equal(ico[6 + 16], 32, 'second directory entry width')
    assert.equal(ico[6 + 32], 0, '256 px must be encoded as 0')

    let expectedOffset = 6 + 16 * entries.length
    entries.forEach((entry, index) => {
        const at = 6 + index * 16
        assert.equal(ico.readUInt32LE(at + 8), entry.png.length, 'byte length')
        assert.equal(ico.readUInt16LE(at + 6), 32, '32 bits per pixel')
        assert.equal(ico.readUInt32LE(at + 12), expectedOffset, 'payload offset')
        expectedOffset += entry.png.length
    })
    assert.equal(ico.length, expectedOffset, 'no trailing bytes')
})

test('the shipped ICO sizes are the documented ones', () => {
    assert.deepEqual(ICO_SIZES, [16, 32, 48])
})

/* -------------------------------------------------------------------------- */
/* Brand rules on app/icon.svg (see brand/favicon-alternatives/README.md)     */
/* -------------------------------------------------------------------------- */

test('app/icon.svg obeys the documented brand rules', () => {
    const svg = read(path.join('app', 'icon.svg'))

    assert.match(svg, /viewBox="0 0 64 64"/, 'the 64-unit grid is the house convention')
    assert.ok(!/\bstroke\s*=/.test(svg), 'the glyph must be closed polygons, never strokes')
    assert.ok(!/stroke-linejoin/.test(svg), 'miter joins were the original defect')

    const paths = svg.match(/<path\b[^>]*\bd="([^"]+)"/g) ?? []
    assert.ok(paths.length >= 1, 'the monogram must exist as a path')
    for (const pathElement of paths) {
        assert.match(pathElement, /Z"?$/, `every path must be closed: ${pathElement.slice(0, 40)}…`)
    }
})

test('the monogram is a single glyph', () => {
    // Two letters ("NQ") blur at 16 px and read as "NC"; the rule is one glyph.
    // Paint defs (gradients) do not count: they style the one shape.
    const svg = read(path.join('app', 'icon.svg'))
    const paths = svg.match(/<path\b[^>]*\bd="([^"]+)"/g) ?? []
    assert.equal(paths.length, 1, 'exactly one drawable glyph shape')
    const paintIds = svg.match(/<(?:linearGradient|radialGradient|pattern)\b/g) ?? []
    for (const shape of svg.match(/<(?:use|rect|circle|polygon|ellipse)\b[^>]*>/g) ?? []) {
        assert.ok(
            /href="#n"|fill=/.test(shape),
            `unexpected drawable element (the glyph is one closed path): ${shape.slice(0, 40)}…`,
        )
    }
    assert.ok(paintIds.length <= 1, 'at most one paint definition')
})

/* -------------------------------------------------------------------------- */
/* Ghost-icon guard                                                           */
/* -------------------------------------------------------------------------- */

test('every icon referenced by app/manifest.ts exists on disk', () => {
    // Regression: the manifest referenced /icon-192.png and /icon-512.png while
    // neither file existed, so the PWA manifest served 404s.
    const manifest = read(path.join('app', 'manifest.ts'))
    const sources = [...manifest.matchAll(/src:\s*'([^']+)'/g)].map((match) => match[1])
    assert.ok(sources.length >= 1, 'manifest should reference at least one icon')
    for (const src of sources) {
        const file = path.join(root, 'public', src.replace(/^\//, ''))
        assert.ok(fs.existsSync(file), `manifest references ${src} but public${src} does not exist`)
    }
})

test('every documented icon output exists on disk', () => {
    for (const file of ['app/favicon.ico', 'app/apple-icon.png', 'public/icon-192.png', 'public/icon-512.png']) {
        assert.ok(fs.existsSync(path.join(root, file)), `${file} is missing — run \`pnpm icons:generate\``)
    }
})
