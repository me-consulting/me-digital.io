import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  protected readonly path = '/';
  protected readonly h1Text = 'Software, die hält';
  protected readonly title = 'Start — ME Digital';
  constructor(page: Page) {
    super(page);
  }

  /** Phone viewport + load home + assert the burger menu behavior. */
  async assertMobileMenuOpens(): Promise<void> {
    await this.page.setViewportSize({ width: 390, height: 844 });
    await this.goto();
    await this.nav.assertMobileMenuOpens();
  }
}
