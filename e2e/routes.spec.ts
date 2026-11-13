import { test, expect } from '@playwright/test';

// Smoke: every route renders its heading + the catch-all (**) falls back to home.
const pages: { path: string; h1: string }[] = [
  { path: '/', h1: 'Software, die hält' },
  { path: '/services', h1: 'Leistungen, passgenau für Sie' },
  { path: '/about', h1: 'Wer wir sind' },
  { path: '/contact', h1: 'Sprechen Sie mit uns' },
  { path: '/impressum', h1: 'Impressum' },
  { path: '/datenschutz', h1: 'Datenschutzerklärung' },
];

for (const { path, h1 } of pages) {
  test(`${path} renders its heading`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toContainText(h1);
  });
}

test('unknown route falls back to home (catch-all **)', async ({ page }) => {
  await page.goto('/this-route-does-not-exist-xyz');
  await expect(page.locator('h1')).toContainText('Software, die hält');
});

test('no console errors on any route', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));
  for (const { path } of pages) await page.goto(path);
  expect(errors).toEqual([]);
});
