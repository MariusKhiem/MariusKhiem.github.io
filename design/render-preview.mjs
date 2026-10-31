// Lager public/preview.png (1200 × 627) fra design/preview.html.
// Krever Playwright:  npx playwright install chromium  (første gang)
// Kjør fra rotmappen:  node design/render-preview.mjs
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 627 } })
await page.goto('file://' + path.join(here, 'preview.html'))
await page.evaluate(() => document.fonts.ready)
await page.locator('#card').screenshot({ path: path.join(here, '..', 'public', 'preview.png') })
await browser.close()
console.log('Lagret public/preview.png')
