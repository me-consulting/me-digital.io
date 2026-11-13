import { test, expect } from '@playwright/test';

// UI-level legal guards (complement the data-level `pnpm legal` + the puppeteer
// legal_live.js). Catches a regression that renders the wrong text in the browser.
test('impressum: USt-IdNr + §5 DDG, no ODR/TMG/TDG', async ({ page }) => {
  await page.goto('/impressum');
  const text = await page.locator('.legal').innerText();
  expect(text).toMatch(/DE304454733/);
  expect(text).toMatch(/§\s?5\s?DDG/i);
  expect(text).not.toMatch(/ec\.europa\.eu\/consumers\/odr/i);
  expect(text).not.toMatch(/§\s?\d+\s?TMG/i);
  expect(text).not.toMatch(/\bTDG\b/i);
});

test('datenschutz: Art. 6 Abs. 1 lit. f + SCC Art. 46, no TMG/TDG', async ({ page }) => {
  await page.goto('/datenschutz');
  const text = await page.locator('.legal').innerText();
  expect(text).toMatch(/Art\.?\s?6\s?Abs\.?\s?1\s?lit\.?\s?f/i);
  expect(text).toMatch(/Standardvertragsklauseln|Art\.?\s?46/i);
  expect(text).not.toMatch(/§\s?\d+\s?TMG/i);
  expect(text).not.toMatch(/\bTDG\b/i);
});
