import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { site } from '../content';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  readonly brand = site.name;
  readonly links = [
    { label: 'Start', href: '' },
    { label: 'Leistungen', href: 'services' },
    { label: 'Über uns', href: 'about' },
    { label: 'Kontakt', href: 'contact' },
  ];
  readonly open = signal(false);
  /** True when the dark theme is active. Seeded from <html data-theme> which the
      inline script in index.html sets before first paint (no flash). */
  readonly dark = signal(
    (typeof document !== 'undefined' && document.documentElement.dataset['theme'] === 'dark') || false,
  );

  /** Flip the theme, persist the choice, and keep the DOM attribute in sync so the
      global :root[data-theme='dark'] tokens take over immediately. */
  toggleTheme(): void {
    const next = !this.dark();
    this.dark.set(next);
    document.documentElement.dataset['theme'] = next ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* storage may be unavailable (private mode / SSR) — attribute still set */
    }
  }

  toggle(): void {
    this.open.update((o) => !o);
  }

  close(): void {
    this.open.set(false);
  }
}
