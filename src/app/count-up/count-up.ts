import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

/**
 * [countUp] — count a number up from 0 when it scrolls into view.
 *
 * Reads its own value (from the [countUp] input, or the host's textContent),
 * parses a leading integer + suffix (e.g. "35+" -> 35, "+") and animates
 * 0 -> target with an easeOutCubic over ~1.1s. Non-numeric values
 * ("Frontend & KI", "Full-Stack") are left untouched.
 *
 * No-JS / reduced-motion safe: the template already renders the final value, so
 * a broken script shows the right number. When reduced motion is requested (or
 * requestAnimationFrame is unavailable) the directive just normalises to the
 * final value instead of animating.
 */
@Directive({
  selector: '[countUp]',
  standalone: true,
})
export class CountUp implements OnInit, OnDestroy {
  @Input() countUp: string | null = null;

  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;
  private raf = 0;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const src = this.countUp ?? node.textContent ?? '';
    const m = src.match(/^\s*(\d+)([^\d]*)$/);
    if (!m) return; // not a numeric stat — leave the text as-is

    const target = parseInt(m[1], 10);
    const suffix = m[2] ?? '';

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof requestAnimationFrame === 'undefined') {
      node.textContent = `${target}${suffix}`; // correct, no animation
      return;
    }

    // Arm at 0 and count up when it enters the viewport (immediately if already
    // in view, e.g. the hero stats on first paint).
    node.textContent = `0${suffix}`;
    this.io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.run(target, suffix, node);
            this.io?.unobserve(entry.target); // animate once
          }
        }
      },
      { threshold: 0.35 },
    );
    this.io.observe(node);
  }

  private run(target: number, suffix: string, node: HTMLElement): void {
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number): void => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      node.textContent = `${Math.round(eased * target)}${suffix}`;
      if (p < 1) {
        this.raf = requestAnimationFrame(tick);
      } else {
        node.textContent = `${target}${suffix}`; // land exactly on target
      }
    };
    this.raf = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
