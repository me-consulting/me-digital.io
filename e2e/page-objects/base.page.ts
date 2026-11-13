import { expect, Locator, Page } from '@playwright/test';
import { Nav } from './nav.page';

// The nav is on every route (sticky <app-nav>); every route also has exactly one
// <h1>. BasePage owns that shared shape; each route subclass supplies its path +
// expected heading text. assert() is the common "page works" check (load + render).
export abstract class BasePage {
  readonly nav: Nav;
  protected readonly h1: Locator;

  protected abstract readonly path: string;
  protected abstract readonly h1Text: string;

  protected constructor(protected readonly page: Page) {
    this.nav = new Nav(page);
    this.h1 = page.getByRole('heading', { level: 1 });
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  async assertRenders(): Promise<void> {
    await expect(this.h1).toContainText(this.h1Text);
  }

  /** Load the page and assert it renders its heading. */
  async assert(): Promise<void> {
    await this.goto();
    await this.assertRenders();
  }
}
