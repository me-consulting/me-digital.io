import { test } from '@playwright/test';
import { Site } from './page-objects/site.page';

// SEO: every route sets a distinct document <title> via the router title config.
test('every route sets its document title (SEO)', async ({ page }) => {
  await Site.assertAllTitles(page);
});
