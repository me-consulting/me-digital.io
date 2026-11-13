import { expect, Locator, Page } from '@playwright/test';

// Component object for the cross-cutting nav (on every route). Encapsulates the
// burger/theme interactions + the "scope links to the nav" rule (avoids the 4-elem
// strict-mode clash: nav link + 2 CTAs + footer link). Specs call the high-level
// assert* methods; they hold no raw locators.
export class Nav {
  readonly burger: Locator;
  readonly menu: Locator;
  readonly host: Locator;
  private readonly links: Locator;
  private readonly themeToggle: Locator;
  private readonly page: Page;

  // label -> expected route: the nav's routing contract (data, not test logic).
  private static readonly ROUTES: [string, string][] = [
    ['Leistungen', '/services'],
    ['Über uns', '/about'],
    ['Kontakt', '/contact'],
  ];

  constructor(page: Page) {
    this.page = page;
    this.burger = page.getByRole('button', { name: 'Menü umschalten' });
    this.menu = page.locator('.nav__links--open');
    this.host = page.locator('app-nav');
    this.links = page.getByRole('navigation', { name: 'Hauptnavigation' });
    this.themeToggle = page.getByRole('button', {
      name: /hellen Design|dunklen Design/i,
    });
  }

  /** A nav link by label, scoped to the nav (exact avoids "Alle Leistungen ansehen"). */
  link(label: string): Locator {
    return this.links.getByRole('link', { name: label, exact: true });
  }

  /** Open the mobile burger menu when the viewport is narrow enough to show it. */
  async openMenuIfNeeded(): Promise<void> {
    if (await this.burger.isVisible()) await this.burger.click();
  }

  /** Current theme via a locator attribute read — no document. reach-in. */
  private async themeState(): Promise<string | null> {
    return this.page.locator('html').getAttribute('data-theme');
  }

  /** Each nav label routes to its expected path (mobile + desktop safe). */
  async assertNavRoutes(): Promise<void> {
    for (const [label, path] of Nav.ROUTES) {
      await this.page.goto('/'); // menu may auto-close on a link click
      await this.openMenuIfNeeded();
      await this.link(label).click();
      await expect(this.page).toHaveURL(new RegExp(path + '$'));
    }
  }

  /** Toggling the theme flips data-theme and the choice survives a reload. */
  async assertThemeTogglePersists(): Promise<void> {
    await this.page.goto('/');
    const before = await this.themeState();
    await this.themeToggle.click();
    const after = await this.themeState();
    expect(after).not.toEqual(before);
    await this.page.reload();
    expect(await this.themeState()).toEqual(after);
  }

  /** Burger shows, opens the menu, a nav link is visible, host spans the viewport. */
  async assertMobileMenuOpens(): Promise<void> {
    await expect(this.burger).toBeVisible();
    await this.openMenuIfNeeded();
    await expect(this.menu).toBeVisible();
    await expect(this.link('Leistungen')).toBeVisible();
    const box = await this.host.boundingBox();
    expect(box?.width).toBeGreaterThan(300);
  }
}
