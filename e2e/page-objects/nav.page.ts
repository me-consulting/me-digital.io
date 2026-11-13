import { Locator, Page } from '@playwright/test';

// Component object for the cross-cutting nav (present on every route). Encapsulates
// the burger/theme-toggle interactions + the "scope links to the nav" rule that
// avoids the 4-element strict-mode clash (nav link + 2 CTAs + footer link).
export class Nav {
  readonly burger: Locator;
  readonly menu: Locator;
  readonly host: Locator;
  private readonly links: Locator;
  private readonly themeToggle: Locator;
  private readonly page: Page;

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

  async toggleTheme(): Promise<void> {
    await this.themeToggle.click();
  }

  async themeState(): Promise<string> {
    return this.page.evaluate(() => document.documentElement.dataset['theme']);
  }

  async hostWidth(): Promise<number> {
    return this.host.evaluate((el) => el.getBoundingClientRect().width);
  }
}
