import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Native anchor + history-restore scrolling are disabled so the ScrollManager
    // component is the single, deterministic source of truth for scroll position
    // (top on every page load, and section jumps for footer "#id" links).
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'disabled',
        scrollPositionRestoration: 'disabled',
      }),
    )
  ]
};
