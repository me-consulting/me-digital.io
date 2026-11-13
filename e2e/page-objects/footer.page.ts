import { expect, Locator, Page } from '@playwright/test';

// Component object for the global <footer> (role "contentinfo"), present on every
// page: four link columns (Seiten / Leistungen / Kontakt / Rechtliches) + a mailto.
export class Footer {
  readonly root: Locator;
  private readonly mailto: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByRole('contentinfo');
    this.mailto = this.root.getByRole('link', { name: /@/ });
  }

  link(label: string): Locator {
    return this.root.getByRole('link', { name: label, exact: true });
  }

  /** The four columns + the mailto link render. */
  async assertRenders(): Promise<void> {
    for (const col of ['Seiten', 'Leistungen', 'Kontakt', 'Rechtliches']) {
      await expect(
        this.root.getByRole('heading', { name: col, exact: true }),
      ).toBeVisible();
    }
    await expect(this.mailto).toBeVisible();
  }

  /** A footer routerLink navigates to its route. */
  async assertNavigates(label: string, path: string): Promise<void> {
    await this.link(label).click();
    await expect(this.page).toHaveURL(new RegExp(path + '$'));
  }
}
