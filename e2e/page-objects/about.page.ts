import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AboutPage extends BasePage {
  protected readonly path = '/about';
  protected readonly h1Text = 'Wer wir sind';
  protected readonly title = 'Über uns — ME Digital';
  constructor(page: Page) {
    super(page);
  }
}
