import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={'width': 375, 'height': 812},
            is_mobile=True,
            device_scale_factor=2,
        )
        page = await context.new_page()
        await page.goto("http://localhost:8000")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification_mobile.png")
        await browser.close()

asyncio.run(main())
