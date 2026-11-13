import { test } from '@playwright/test';
import { ContactPage } from './page-objects/contact.page';

// The contact form validates on the client. An empty submit shows the German
// alert WITHOUT hitting Web3Forms; the happy path would send a real email, so it
// is not tested (see contact.page.ts).
test('empty contact submit shows the validation error', async ({ page }) => {
  await new ContactPage(page).assertValidationErrorOnEmpty();
});
