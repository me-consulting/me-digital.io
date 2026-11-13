import { expect, test } from '@playwright/test';
import { HomePage } from './page-objects/home.page';

test('nav links navigate to the right routes', async ({ page }) => {
  const home = new HomePage(page);
  const links: [string, string][] = [
    ['Leistungen', '/services'],
    ['Über uns', '/about'],
    ['Kontakt', '/contact'],
  ];
  for (const [label, path] of links) {
    await home.goto(); // fresh home each iteration (menu may auto-close on click)
    await home.nav.openMenuIfNeeded(); // open the burger menu on a phone-width viewport
    await home.nav.link(label).click();
    await expect(page).toHaveURL(new RegExp(path + '$'));
  }
});

test('theme toggle flips data-theme and persists across reload', async ({
  page,
}) => {
  const home = new HomePage(page);
  await home.goto();
  const before = await home.nav.themeState();
  await home.nav.toggleTheme();
  const after = await home.nav.themeState();
  expect(after).not.toEqual(before);
  await page.reload();
  expect(await home.nav.themeState()).toEqual(after);
});
