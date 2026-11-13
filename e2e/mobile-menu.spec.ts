import { test, expect } from '@playwright/test';

// Regression guard for the iPhone nav bug: WebKit collapsed the inline :host to a
// few px, leaving the mobile menu panel tiny + text wrapping after every word.
// Fix = :host { display: block } in nav.scss.
// NOTE: headless Chromium stretches the sticky :host even WITHOUT the fix, so this
// test guards the STRUCTURE (menu opens, links visible, host full-width) but cannot
// reproduce the WebKit-specific collapse — keep a manual iPhone check for that.
test('mobile menu: burger opens nav, links visible, host full-width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  // On a phone-width viewport the burger is shown; the menu is hidden until opened.
  const burger = page.getByRole('button', { name: 'Menü umschalten' });
  await expect(burger).toBeVisible();

  await burger.click();
  const openMenu = page.locator('.nav__links--open');
  await expect(openMenu).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: 'Hauptnavigation' }).getByRole('link', { name: 'Leistungen', exact: true }),
  ).toBeVisible();

  // The nav host must span the viewport (the bug collapsed it to a few px).
  const width = await page.locator('app-nav').evaluate((el) =>
    el.getBoundingClientRect().width,
  );
  expect(width).toBeGreaterThan(300);
});
