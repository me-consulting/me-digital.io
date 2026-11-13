import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AboutPage extends BasePage {
  protected readonly path = '/about';
  protected readonly h1Text = 'Wer wir sind';
  constructor(page: Page) {
    super(page);
  }
}
