import { test } from '@playwright/test';
import { DatenschutzPage } from './page-objects/datenschutz.page';
import { ImpressumPage } from './page-objects/impressum.page';

// UI-level legal guards (complement the data-level `pnpm legal` + the puppeteer
// legal_live.js). Catch a regression that renders the wrong text in the browser.
test('impressum: USt-IdNr + §5 DDG, no ODR/TMG/TDG', async ({ page }) => {
  const impressum = new ImpressumPage(page);
  await impressum.goto();
  await impressum.assertLegal();
});

test('datenschutz: Art. 6 Abs. 1 lit. f + SCC Art. 46, no TMG/TDG', async ({
  page,
}) => {
  const datenschutz = new DatenschutzPage(page);
  await datenschutz.goto();
  await datenschutz.assertLegal();
});
