import { Component, OnDestroy, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

/**
 * Single source of truth for scroll position in the SPA.
 *
 *  - On every page navigation we jump to the top, so clicking "Impressum",
 *    "Kontakt", … (or any page link) never drops you part-way down the new page.
 *  - If the URL carries a fragment (#frontend, #cloud, …) we scroll to that
 *    section instead, offset below the sticky nav so the heading isn't hidden.
 *
 * Native browser anchor / history-restore scrolling is disabled in app.config,
 * so this component is the only thing that moves the scroll position.
 */
@Component({
  selector: 'app-scroll-manager',
  standalone: true,
  template: '',
})
export class ScrollManager implements OnDestroy {
  private readonly router = inject(Router);
  private readonly sub = this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) this.onNavigate();
  });

  private onNavigate(): void {
    const hash = this.router.url.split('#')[1];
    if (hash) {
      this.scrollToSection(decodeURIComponent(hash));
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }

  private scrollToSection(id: string, attempt = 0): void {
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        const nav = document.querySelector('app-nav') as HTMLElement | null;
        const offset = (nav?.offsetHeight ?? 68) + 16;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      } else if (attempt < 30) {
        // Lazy route may not be rendered when NavigationEnd fires — retry.
        this.scrollToSection(id, attempt + 1);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
