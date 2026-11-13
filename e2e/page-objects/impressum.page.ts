import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

// Impressum: the `.legal` body must carry the required Pflichtangaben and must NOT
// carry repealed/abmahnung-risky citations (TMG/TDG, the removed EU-ODR link).
export class ImpressumPage extends BasePage {
  protected readonly path = '/impressum';
  protected readonly h1Text = 'Impressum';
  private readonly legal: Locator;
  constructor(page: Page) {
    super(page);
    this.legal = page.locator('.legal');
  }

  async assertLegal(): Promise<void> {
    const text = await this.legal.innerText();
    expect(text).toMatch(/DE304454733/); // USt-IdNr
    expect(text).toMatch(/§\s?5\s?DDG/i);
    expect(text).not.toMatch(/ec\.europa\.eu\/consumers\/odr/i);
    expect(text).not.toMatch(/§\s?\d+\s?TMG/i);
    expect(text).not.toMatch(/\bTDG\b/i);
  }
}
