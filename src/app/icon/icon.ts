import { Component, Input, computed, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { ICONS } from './icons';

/**
 * <app-icon name="cloud" /> — renders a self-hosted lucide-style line icon.
 * The SVG is pulled from a static, trusted map (ICONS) and injected via a
 * sanitized [innerHTML], so there is no runtime dependency and no XSS surface.
 * Icons use stroke=currentColor, so they inherit whatever colour the parent sets.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<span class="icon" [innerHTML]="svg()" aria-hidden="true"></span>`,
})
export class IconComponent {
  @Input() name = '';
  private sanitizer = inject(DomSanitizer);
  private svg = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name] ?? ''),
  );
}
