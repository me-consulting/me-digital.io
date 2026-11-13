import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  protected readonly path = '/contact';
  protected readonly h1Text = 'Sprechen Sie mit uns';
  constructor(page: Page) {
    super(page);
  }
}
