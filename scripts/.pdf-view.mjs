import { chromium } from 'playwright'

const pdfUrl = 'file:///tmp/linkedin-profile.pdf'

for (const launch of [
    { label: 'chromium (build completa)', opts: { channel: 'chromium' } },
    { label: 'headless shell', opts: {} },
]) {
    let browser
    try {
        browser = await chromium.launch(launch.opts)
        const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } })
        await page.goto(pdfUrl, { waitUntil: 'load', timeout: 20000 })
        await page.waitForTimeout(2500)
        const title = await page.title()
        const embeds = await page.evaluate(() => document.querySelectorAll('embed,object,iframe').length)
        const bodyText = (await page.evaluate(() => document.body?.innerText ?? '')).slice(0, 60)
        console.log(`${launch.label}: title="${title}" embeds=${embeds} body="${bodyText.replace(/\n/g, ' ')}"`)
        await page.screenshot({ path: `/tmp/pdf-${launch.label.split(' ')[0]}.png` })
    } catch (error) {
        console.log(`${launch.label}: ERROR ${error.message.split('\n')[0]}`)
    } finally {
        if (browser) await browser.close()
    }
}
