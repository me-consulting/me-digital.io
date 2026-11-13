import { expect, Page, test } from '@playwright/test';
import { AboutPage } from './page-objects/about.page';
import { ContactPage } from './page-objects/contact.page';
import { DatenschutzPage } from './page-objects/datenschutz.page';
import { HomePage } from './page-objects/home.page';
import { ImpressumPage } from './page-objects/impressum.page';
import { ServicesPage } from './page-objects/services.page';
import { BasePage } from './page-objects/base.page';

// One page object per route; the registry is the single source of truth for
// "which routes exist" + what each one's heading is.
const routes: { path: string; make: (page: Page) => BasePage }[] = [
  { path: '/', make: (p) => new HomePage(p) },
  { path: '/services', make: (p) => new ServicesPage(p) },
  { path: '/about', make: (p) => new AboutPage(p) },
  { path: '/contact', make: (p) => new ContactPage(p) },
  { path: '/impressum', make: (p) => new ImpressumPage(p) },
  { path: '/datenschutz', make: (p) => new DatenschutzPage(p) },
];

for (const { path, make } of routes) {
  test(`${path} renders its heading`, async ({ page }) => {
    const target = make(page);
    await target.goto();
    await target.assertRenders();
  });
}

test('unknown route falls back to home (catch-all **)', async ({ page }) => {
  await page.goto('/this-route-does-not-exist-xyz');
  await new HomePage(page).assertRenders();
});

test('no console errors on any route', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));
  for (const { path } of routes) await page.goto(path);
  expect(errors).toEqual([]);
});
