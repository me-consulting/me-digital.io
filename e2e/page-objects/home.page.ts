import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  protected readonly path = '/';
  protected readonly h1Text = 'Software, die hält';
  constructor(page: Page) {
    super(page);
  }
}
