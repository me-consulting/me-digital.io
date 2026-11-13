import { test } from '@playwright/test';
import { HomePage } from './page-objects/home.page';

test('nav links navigate to the right routes', async ({ page }) => {
  await new HomePage(page).nav.assertNavRoutes();
});

test('theme toggle flips data-theme and persists across reload', async ({
  page,
}) => {
  await new HomePage(page).nav.assertThemeTogglePersists();
});
