import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ServicesPage extends BasePage {
  protected readonly path = '/services';
  protected readonly h1Text = 'Leistungen, passgenau für Sie';
  constructor(page: Page) {
    super(page);
  }
}
