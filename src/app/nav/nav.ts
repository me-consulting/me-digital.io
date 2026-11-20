import { Component, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { site } from '../content';

type Theme = 'light' | 'dark' | 'gta' | 'gta-light';

/**
 * Theme configuration — the single source of truth for what the toggle offers.
 *
 * INCLUDE_LEGACY = false HIDES the original warm light/dark themes from the
 * toggle (their CSS stays in styles.scss, fully intact) and shows only the GTA
 * family. Flip it to `true` to restore the original 4-theme cycle — nothing else
 * changes.
 *
 * To ship "just one GTA theme" instead of two, use:
 *     const THEMES: Theme[] = ['gta'];
 * The toggle auto-hides itself when only one theme is listed.
 *
 * NOTE: the no-flash default in index.html must stay in sync with DEFAULT_THEME.
 */
const INCLUDE_LEGACY = false;
const THEMES: Theme[] = INCLUDE_LEGACY
  ? ['light', 'dark', 'gta', 'gta-light']
  : ['gta', 'gta-light'];

const DARK_THEMES = new Set<Theme>(['dark', 'gta']);
const DEFAULT_THEME: Theme = 'gta';

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

  /** Active theme, cycled by the toggle. Seeded from <html data-theme> which the
      inline script in index.html sets before first paint (no flash). */
  readonly theme = signal<Theme>(readStoredTheme());

  /** The toggle only makes sense with >1 theme; hide it for a single-theme build. */
  readonly showToggle = THEMES.length > 1;

  /** True for the "night" variants — drives the sun/moon icon. */
  readonly isDark = computed(() => DARK_THEMES.has(this.theme()));

  /** German label for the toggle: describes the theme the click will switch TO. */
  readonly themeLabel = (): string => {
    const i = THEMES.indexOf(this.theme());
    const next = THEMES[(i + 1) % THEMES.length];
    const labels: Record<Theme, string> = {
      light: 'Zum hellen Design wechseln',
      dark: 'Zum dunklen Design wechseln',
      gta: 'Zum Neon-Design wechseln',
      'gta-light': 'Zum hellen Neon-Design wechseln',
    };
    return labels[next];
  };

  /** Advance to the next theme, persist the choice, and keep the DOM attribute in
      sync so the matching :root[data-theme] tokens take over immediately. */
  cycleTheme(): void {
    const i = THEMES.indexOf(this.theme());
    const next = THEMES[(i + 1) % THEMES.length];
    this.theme.set(next);
    document.documentElement.dataset['theme'] = next;
    try {
      localStorage.setItem('theme', next);
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

/** Read the theme the no-flash script already set on <html>, accepting any known
    theme (so a stored legacy theme still applies on load) and falling back to the
    primary theme for anything unrecognised. */
function readStoredTheme(): Theme {
  if (typeof document === 'undefined') return DEFAULT_THEME;
  const t = document.documentElement.dataset['theme'];
  return t === 'gta' || t === 'gta-light' || t === 'dark' || t === 'light'
    ? (t as Theme)
    : DEFAULT_THEME;
}
