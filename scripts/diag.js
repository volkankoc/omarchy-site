const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--disable-gpu", "--hide-scrollbars"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 9000));
  const info = await page.evaluate(() => {
    const pre = document.querySelector("pre.ascii");
    const cs = getComputedStyle(pre);
    const spans = Array.from(pre.querySelectorAll("span span"));
    const widths = new Map();
    spans.forEach((s) => {
      const w = s.getBoundingClientRect().width.toFixed(2);
      const ch = s.textContent;
      if (!widths.has(w)) widths.set(w, []);
      widths.get(w).push(ch);
    });
    return {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      preWidth: pre.getBoundingClientRect().width,
      distinctWidths: Array.from(widths.entries()).map(([w, chars]) => ({
        width: w,
        count: chars.length,
        sample: Array.from(new Set(chars)).slice(0, 12).join(""),
      })),
      hasBlockInJetbrains: document.fonts.check('700 16px "JetBrains Mono"', "█"),
      hasGreekInJetbrains: document.fonts.check('700 16px "JetBrains Mono"', "λ"),
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
