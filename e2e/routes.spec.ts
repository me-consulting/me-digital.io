import { test } from '@playwright/test';
import { HomePage } from './page-objects/home.page';
import { Site } from './page-objects/site.page';

test('every route renders its heading', async ({ page }) => {
  await Site.assertAllRender(page);
});

test('unknown route falls back to home (catch-all **)', async ({ page }) => {
  await page.goto('/this-route-does-not-exist-xyz');
  await new HomePage(page).assertRenders();
});

test('no console errors on any route', async ({ page }) => {
  await Site.assertNoConsoleErrors(page);
});
