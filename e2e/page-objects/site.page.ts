import { expect, Page } from '@playwright/test';
import { AboutPage } from './about.page';
import { ContactPage } from './contact.page';
import { DatenschutzPage } from './datenschutz.page';
import { HomePage } from './home.page';
import { ImpressumPage } from './impressum.page';
import { ServicesPage } from './services.page';
import { BasePage } from './base.page';

// Cross-route checks that need more than one page object at a time. The route
// registry is the single source of truth for "which routes exist."
export class Site {
  static readonly routes: { path: string; make: (page: Page) => BasePage }[] = [
    { path: '/', make: (p) => new HomePage(p) },
    { path: '/services', make: (p) => new ServicesPage(p) },
    { path: '/about', make: (p) => new AboutPage(p) },
    { path: '/contact', make: (p) => new ContactPage(p) },
    { path: '/impressum', make: (p) => new ImpressumPage(p) },
    { path: '/datenschutz', make: (p) => new DatenschutzPage(p) },
  ];

  static async assertAllRender(page: Page): Promise<void> {
    for (const { make } of Site.routes) await make(page).assert();
  }

  static async assertAllTitles(page: Page): Promise<void> {
    for (const { make } of Site.routes) {
      const target = make(page);
      await target.goto();
      await target.assertTitle();
    }
  }

  static async assertNoConsoleErrors(page: Page): Promise<void> {
    const errors: string[] = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(String(e)));
    for (const { path } of Site.routes) await page.goto(path);
    expect(errors).toEqual([]);
  }
}
