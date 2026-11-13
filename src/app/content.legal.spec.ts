import { describe, it, expect } from 'vitest';
import { site } from './content';

/**
 * Abmahnfalle-Guardrail (reusable, kein Browser nötig): prüft, dass Impressum +
 * Datenschutzerklärung die Pflichtangaben nach § 5 DDG / DSGVO enthalten und KEINE
 * abgelaufenen Zitate (TMG/TDG) noch tote ODR-/OS-Plattform-Verlinkung tragen.
 * Liest den Single-Source-of-Truth (content.ts) direkt.
 *
 * Starten: `pnpm legal`  (oder: `pnpm exec vitest run src/app/content.legal.spec.ts`)
 *
 * Hintergrund (2026-11-13 live-geprüft):
 *  - ODR-/OS-Plattform-Link ist entfernt (Reg. (EU) 2024/3228 hob ODR-VO 524/2013
 *    zum 20.07.2025 auf -> tote Verlinkung = aktive Abmahnfalle).
 *  - Web3Forms ist ein echter Art.-28-Auftragsverarbeiter (DPA web3forms.com/dpa,
 *    v1.0) -> SCC Art. 46 (2021/914) als Drittlandbasis; NICHT "3 Jahre speichern"
 *    (Web3Forms' eigene FAQ: "we do not store any form submissions").
 */
describe('legal — Impressum (§ 5 DDG)', () => {
  const imp = site.legal.impressum;

  it('hat Name, Adresse, E-Mail, Telefon, USt-IdNr', () => {
    expect(imp.name).toMatch(/Mario\s+Ernst/i);
    expect(`${imp.zip} ${imp.city}`).toMatch(/70619\s+Stuttgart/i);
    expect(imp.email).toMatch(/@me-digital\.io$/);
    expect(imp.phone).toMatch(/^\+49/);
    expect(imp.vatId).toMatch(/^DE\d{9}$/);
  });

  it('trägt keine abgelaufenen TMG/TDG-Zitate und keinen ODR-Link', () => {
    const all = JSON.stringify(site.legal);
    expect(all).not.toMatch(/\bTMG\b/i);
    expect(all).not.toMatch(/\bTDG\b/i);
    expect(all).not.toMatch(/ec\.europa\.eu\/consumers\/odr/i);
  });

  it('benennt „Inhaltlich Verantwortlicher" gemäß § 18 Abs. 2 MStV (eRecht24-Muster)', () => {
    const h = site.legal.impressumClauses
      .map((c: { heading: string; text: string }) => `${c.heading}: ${c.text}`)
      .join(' | ');
    expect(h).toContain('Inhaltlich Verantwortlicher');
    expect(h).toMatch(/§\s?18\s?Abs\.?\s?2\s?MStV/i);
  });
});

describe('legal — Datenschutz (DSGVO)', () => {
  const dat = site.legal.datenschutz.map((b: { text: string }) => b.text).join('\n');

  it('nennt Verantwortlicher + E-Mail + Rechtsgrundlage Art. 6 Abs. 1 lit. f', () => {
    expect(dat).toMatch(/Verantwortlich/i);
    expect(dat).toMatch(/@me-digital\.io/);
    expect(dat).toMatch(/Art\.\s?6\s?Abs\.\s?1\s?lit\.\s?f/i);
  });

  it('weist Web3Forms als Art.-28-Auftragsverarbeiter + SCC Art. 46 + DPA-Link aus', () => {
    expect(dat).toMatch(/Art\.\s?28\s?DSGVO/i);
    expect(dat).toMatch(/Standardvertragsklauseln|Art\.\s?46\s?DSGVO/i);
    expect(dat).toMatch(/web3forms\.com\/dpa/i);
    expect(dat).toMatch(/Indien/i);
  });

  it('führt Server-Logs aus und bestätigt keine Cookies/Tracking', () => {
    expect(dat).toMatch(/Server-Logfiles|Server-Log/i);
    expect(dat).toMatch(/keine Cookies/i);
  });

  it('hat keine abgelaufenen TMG/TDG-Zitate', () => {
    const all = JSON.stringify(site.legal);
    expect(all).not.toMatch(/\bTMG\b/i);
    expect(all).not.toMatch(/\bTDG\b/i);
  });
});
