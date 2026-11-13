import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ServicesPage extends BasePage {
  protected readonly path = '/services';
  protected readonly h1Text = 'Leistungen, passgenau für Sie';
  protected readonly title = 'Leistungen — ME Digital';
  constructor(page: Page) {
    super(page);
  }
}
