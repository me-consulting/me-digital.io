import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

// Datenschutzerklärung: legal basis (Art. 6 Abs. 1 lit. f) + international-transfer
// basis (SCC Art. 46) present; no repealed TMG/TDG citations.
// assert() = render the heading (super) + check the legal body.
export class DatenschutzPage extends BasePage {
  protected readonly path = '/datenschutz';
  protected readonly h1Text = 'Datenschutzerklärung';
  protected readonly title = 'Datenschutzerklärung — ME Digital';
  private readonly legal: Locator;
  constructor(page: Page) {
    super(page);
    this.legal = page.locator('.legal');
  }

  async assertLegal(): Promise<void> {
    const text = await this.legal.innerText();
    expect(text).toMatch(/Art\.?\s?6\s?Abs\.?\s?1\s?lit\.?\s?f/i);
    expect(text).toMatch(/Standardvertragsklauseln|Art\.?\s?46/i);
    expect(text).not.toMatch(/§\s?\d+\s?TMG/i);
    expect(text).not.toMatch(/\bTDG\b/i);
  }

  async assert(): Promise<void> {
    await super.assert();
    await this.assertLegal();
  }
}
