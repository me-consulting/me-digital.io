import { Component } from '@angular/core';
import { site } from '../../content';

@Component({
  selector: 'app-datenschutz',
  template: `
    <section class="page">
      <div class="container page__head">
        <span class="eyebrow">Rechtliches</span>
        <h1>Datenschutzerklärung</h1>
      </div>

      <div class="container legal legal--prose">
        @for (b of legal.datenschutz; track b.heading) {
          <section class="legal__block">
            <h2>{{ b.heading }}</h2>
            <p>{{ b.text }}</p>
          </section>
        }

        <p class="legal__note">
          Angaben gemäß DSGVO und § 14 TMG.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
    .legal {
      max-width: 760px;
    }
    .legal__block {
      margin-bottom: 1.5rem;
    }
    .legal__block h2 {
      font-size: 1.05rem;
      margin: 0 0 0.5rem;
    }
    .legal__block p {
      line-height: 1.6;
      margin: 0;
      opacity: 0.92;
    }
    .legal__note {
      margin-top: 2rem;
      font-size: 0.85rem;
      opacity: 0.7;
    }
    `,
  ],
})
export class Datenschutz {
  readonly legal = site.legal;
}
