import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

// Signal-driven contact form (no FormsModule). The validation + honeypot paths
// return BEFORE fetch(), so an empty submit is testable with ZERO network. A
// "fill + submit" happy path would POST to the live Web3Forms access_key in
// content.ts and send a real email, so it is deliberately NOT tested here.
export class ContactPage extends BasePage {
  protected readonly path = '/contact';
  protected readonly h1Text = 'Sprechen Sie mit uns';
  protected readonly title = 'Kontakt — ME Digital';

  private readonly submitButton: Locator;
  private readonly alert: Locator;
  private readonly errorText =
    'Bitte geben Sie Name, eine gültige E-Mail-Adresse und eine Nachricht an.';

  constructor(page: Page) {
    super(page);
    this.submitButton = page.getByRole('button', { name: 'Nachricht senden' });
    this.alert = page.getByRole('alert');
  }

  /** Empty submit shows the German validation alert (no network, no real email). */
  async assertValidationErrorOnEmpty(): Promise<void> {
    await this.goto();
    await this.submitButton.click();
    await expect(this.alert).toContainText(this.errorText);
  }
}
