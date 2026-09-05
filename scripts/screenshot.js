/* Full-page screenshot helper: measures real page height (no empty bands)
   and reports horizontal overflow. Usage:
   node scripts/screenshot.js <width> <viewportHeight> <outfile.png> [mid]
   "mid" captures the viewport ~1.3s after load (mid matrix animation). */
const puppeteer = require("puppeteer-core");

(async () => {
  const [width, viewHeight, out, mode] = process.argv.slice(2);
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: +width, height: +viewHeight });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });

  if (mode === "mid" || mode === "mid2") {
    // catch the matrix wall/rain phase (animation starts ~600ms after load,
    // resolves between ~1.5s and 2.6s)
    await new Promise((r) => setTimeout(r, mode === "mid2" ? 1600 : 700));
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: +width, height: +viewHeight } });
    console.log(`${out}: mid-animation viewport capture`);
    await browser.close();
    return;
  }

  // let the hero terminal typing + matrix animations fully settle
  await new Promise((r) => setTimeout(r, 10000));
  // scroll through the page so any lazy content loads, then return to top
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1000));
  const metrics = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  await page.screenshot({ path: out, fullPage: true });
  console.log(
    `${out}: page ${metrics.scrollWidth}x${metrics.scrollHeight} (viewport ${width}px${
      metrics.scrollWidth > +width ? " — HORIZONTAL OVERFLOW!" : ""
    })`
  );
  await browser.close();
})();
