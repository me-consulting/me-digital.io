import { Component } from '@angular/core';
import { site } from '../../content';

@Component({
  selector: 'app-impressum',
  template: `
    <section class="page">
      <div class="container page__head">
        <span class="eyebrow">Rechtliches</span>
        <h1>Impressum</h1>
      </div>

      <div class="container legal">
        <p><strong>Anbieter:</strong> {{ legal.impressum.name }}</p>
        <p>
          {{ legal.impressum.street }}<br />
          {{ legal.impressum.zip }} {{ legal.impressum.city }}<br />
          {{ legal.impressum.country }}
        </p>
        <p>
          <strong>Kontakt:</strong><br />
          @if (legal.impressum.email) {
            E-Mail:
            <a [href]="'mailto:' + legal.impressum.email">{{ legal.impressum.email }}</a
            ><br />
          }
          Telefon:
          <a [href]="'tel:' + legal.impressum.phone">{{ legal.impressum.phone }}</a>
        </p>

        @if (legal.impressum.vatId) {
          <p>
            <strong>Umsatzsteuer-Identifikationsnummer:</strong> {{ legal.impressum.vatId }}
          </p>
        }

        @if (legal.impressum.register) {
          <p>
            <strong>Registergericht / -nummer:</strong> {{ legal.impressum.register }}
          </p>
        }

        <p>
          <strong>Streitbeilegung:</strong> Die Europäische Kommission stellt eine
          Plattform zur Online-Streitbeilegung (OS) bereit:
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            >https://ec.europa.eu/consumers/odr/</a
          >. Wir sind nicht bereit und nicht verpflichtet, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>

        @for (clause of legal.impressumClauses; track clause.heading) {
          <section class="legal__block">
            <h2>{{ clause.heading }}</h2>
            <p>{{ clause.text }}</p>
          </section>
        }

        <p class="legal__note">
          Angaben gemäß § 12 TDG (früher § 5 TMG).
        </p>
      </div>
    </section>
  `,
  styles: [
    `
    .page__head {
      text-align: center;
      max-width: 720px;
      margin: 0 auto;
    }
    .legal {
      max-width: 720px;
      margin: 0 auto;
    }
    .legal p {
      line-height: 1.6;
      margin: 0 0 1rem;
    }
    .legal__block {
      margin-bottom: 1.5rem;
    }
    .legal__block h2 {
      font-size: 1.05rem;
      margin: 0 0 0.5rem;
    }
    .legal__block p {
      margin: 0;
      opacity: 0.92;
    }
    .legal a {
      color: inherit;
      text-decoration: underline;
    }
    .legal__note {
      margin-top: 2rem;
      font-size: 0.85rem;
      opacity: 0.7;
    }
    `,
  ],
})
export class Impressum {
  readonly legal = site.legal;
}
