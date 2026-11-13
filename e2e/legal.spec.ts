import { test } from '@playwright/test';
import { DatenschutzPage } from './page-objects/datenschutz.page';
import { ImpressumPage } from './page-objects/impressum.page';

// UI-level legal guards (complement the data-level `pnpm legal` + the puppeteer
// legal_live.js). Catch a regression that renders the wrong text in the browser.
test('impressum: USt-IdNr + §5 DDG, no ODR/TMG/TDG', async ({ page }) => {
  await new ImpressumPage(page).assert();
});

test('datenschutz: Art. 6 Abs. 1 lit. f + SCC Art. 46, no TMG/TDG', async ({
  page,
}) => {
  await new DatenschutzPage(page).assert();
});
