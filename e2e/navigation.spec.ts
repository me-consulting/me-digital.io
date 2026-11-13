import { test, expect } from '@playwright/test';

test('nav links navigate to the right routes', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Hauptnavigation' });
  const burger = page.getByRole('button', { name: 'Menü umschalten' });
  const links: [string, string][] = [
    ['Leistungen', '/services'],
    ['Über uns', '/about'],
    ['Kontakt', '/contact'],
  ];
  for (const [label, path] of links) {
    await page.goto('/'); // fresh home each iteration (menu may auto-close on click)
    // On a phone-width viewport the links live in a collapsed burger menu — open it.
    if (await burger.isVisible()) await burger.click();
    await nav.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(path + '$'));
  }
});

test('theme toggle flips data-theme and persists across reload', async ({ page }) => {
  await page.goto('/');
  const before = await page.evaluate(() => document.documentElement.dataset['theme']);
  await page.getByRole('button', { name: /hellen Design|dunklen Design/i }).click();
  const after = await page.evaluate(() => document.documentElement.dataset['theme']);
  expect(after).not.toEqual(before);
  await page.reload();
  const persisted = await page.evaluate(() => document.documentElement.dataset['theme']);
  expect(persisted).toEqual(after);
});
