import { expect, test } from '@playwright/test';
import { HomePage } from './page-objects/home.page';

// Regression guard for the iPhone nav bug: WebKit collapsed the inline :host to a
// few px, leaving the mobile menu panel tiny + text wrapping after every word.
// Fix = :host { display: block } in nav.scss. NOTE: headless Chromium stretches the
// sticky :host even WITHOUT the fix, so this guards the STRUCTURE (menu opens, links
// visible, host full-width) but cannot reproduce the WebKit-only collapse — keep a
// manual iPhone check for that.
test('mobile menu: burger opens nav, links visible, host full-width', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const home = new HomePage(page);
  await home.goto();

  await expect(home.nav.burger).toBeVisible();
  await home.nav.openMenuIfNeeded();
  await expect(home.nav.menu).toBeVisible();
  await expect(home.nav.link('Leistungen')).toBeVisible();
  expect(await home.nav.hostWidth()).toBeGreaterThan(300);
});
