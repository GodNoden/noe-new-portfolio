#!/usr/bin/env node
/**
 * Regenerates the three committed résumé PDFs from the print route at
 * `app/cv/[lang]`, which is itself rendered from `app/lib/profile.ts`.
 *
 * Because the PDFs come from the same data as the portfolio, a project added to
 * the site shows up in all three CVs on the next run: the CVs can no longer
 * drift behind the site.
 *
 * Usage:
 *   pnpm cv:generate        # builds, prints the three PDFs into public/
 *
 * One-time setup on a fresh machine:
 *   pnpm cv:setup           # downloads the Chromium build Playwright needs
 *
 * Requires a production build first (the npm script runs `next build` for you).
 */
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { access, mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright'

const require = createRequire(import.meta.url)

const TARGETS = [
    { lang: 'en', file: 'Noe_Quezada_CV_EN.pdf' },
    { lang: 'es', file: 'Noe_Quezada_CV_ES.pdf' },
    { lang: 'fr', file: 'Noe_Quezada_CV_FR.pdf' },
]

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const outputDir = path.join(root, 'public')

const port = Number.parseInt(process.env.CV_PORT ?? '3210', 10)
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error(`CV_PORT must be a valid TCP port, received: ${process.env.CV_PORT}`)
    process.exit(1)
}
const baseUrl = `http://127.0.0.1:${port}`

const exists = async (target) => {
    try {
        await access(target)
        return true
    } catch {
        return false
    }
}

const waitForServer = async (child) => {
    const deadline = Date.now() + 60_000
    while (Date.now() < deadline) {
        if (child.exitCode !== null) {
            throw new Error(`next start exited early with code ${child.exitCode}`)
        }
        try {
            const response = await fetch(baseUrl, { redirect: 'manual' })
            if (response.status < 500) return
        } catch {
            // Server not listening yet.
        }
        await new Promise((resolve) => setTimeout(resolve, 400))
    }
    throw new Error(`Timed out waiting for ${baseUrl} to accept connections`)
}

async function stopServer(child) {
    if (child.exitCode !== null) return
    child.kill('SIGTERM')
    const killed = await Promise.race([
        new Promise((resolve) => child.once('exit', () => resolve(true))),
        new Promise((resolve) => setTimeout(() => resolve(false), 5_000)),
    ])
    if (!killed && child.exitCode === null) child.kill('SIGKILL')
}

async function main() {
    if (!(await exists(path.join(root, '.next', 'BUILD_ID')))) {
        console.error('No production build found. Run `pnpm build` (or `pnpm cv:generate`) first.')
        process.exit(1)
    }

    await mkdir(outputDir, { recursive: true })

    const nextBin = require.resolve('next/dist/bin/next')
    const server = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
        cwd: root,
        stdio: ['ignore', 'pipe', 'pipe'],
    })
    const serverLog = []
    server.stdout.on('data', (chunk) => serverLog.push(chunk.toString()))
    server.stderr.on('data', (chunk) => serverLog.push(chunk.toString()))

    let browser
    try {
        await waitForServer(server)

        browser = await chromium.launch()

        for (const target of TARGETS) {
            const page = await browser.newPage()
            // The résumé must be printed light regardless of the saved theme.
            await page.emulateMedia({ media: 'print', colorScheme: 'light' })
            await page.goto(`${baseUrl}/cv/${target.lang}`, { waitUntil: 'networkidle' })
            await page.evaluate(() => document.fonts.ready)

            const pdf = await page.pdf({
                printBackground: true,
                preferCSSPageSize: true,
            })
            await page.close()

            const destination = path.join(outputDir, target.file)
            await writeFile(destination, pdf)
            const { size } = await stat(destination)
            console.log(`✓ ${target.file} (${(size / 1024).toFixed(1)} KB)`)
        }
    } catch (error) {
        const log = serverLog.join('').trim()
        if (log) console.error(`\n--- next start output ---\n${log}\n`)
        throw error
    } finally {
        if (browser) await browser.close()
        await stopServer(server)
    }
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
})
