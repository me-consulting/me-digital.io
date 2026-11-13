import { test } from '@playwright/test';
import { Footer } from './page-objects/footer.page';

test('footer renders its columns + mailto', async ({ page }) => {
  await page.goto('/');
  await new Footer(page).assertRenders();
});

test('a footer link navigates to its route', async ({ page }) => {
  await page.goto('/');
  await new Footer(page).assertNavigates('Impressum', '/impressum');
});
