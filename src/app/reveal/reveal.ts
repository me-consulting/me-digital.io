import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * [reveal] — gently fade + slide an element into view as it scrolls in.
 *
 * No-JS / reduced-motion safe: elements are visible by default (the base CSS sets
 * opacity:1). The directive only opts an element into the hidden→shown transition
 * when IntersectionObserver is available AND the user hasn't asked for reduced
 * motion — so a broken script or a reduced-motion user never sees hidden content.
 */
@Directive({
  selector: '[reveal]',
  standalone: true,
})
export class Reveal implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;

  ngOnInit(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return;
    const node = this.el.nativeElement;
    node.classList.add('reveal--armed'); // start hidden
    this.io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--shown');
            this.io?.unobserve(entry.target); // animate once
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    this.io.observe(node);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
