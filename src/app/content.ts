/**
 * SINGLE SOURCE OF TRUTH für alle Texte der Website.
 *
 * Alle eckigen Klammern [… ] und […]-Felder hier ersetzen — die ganze Website
 * (Navigation, Seiten, Footer) liest aus dieser Datei, nichts wird dupliziert.
 *
 * Sprache: Deutsch (Standard). English als Umschalter auf Wunsch ergänzbar.
 *
 * Bereiche:
 *   site         Firmen-Identität + Kontakt (Nav + Footer + Kontaktseite)
 *   hero         Landing-Headline + CTAs
 *   stats        Credibility-Zahlen (ehrlich gehalten, nicht übertroben)
 *   valueProps   Warum ME Digital (Home)
 *   services     Leistungsangebote (Home-Übersicht + komplette /services-Seite)
 *   process      So arbeiten wir (Home)
 *   testimonials Referenzen (leer lassen -> Abschnitt wird ausgeblendet)
 *   faqs         Häufige Fragen
 *   legal        Impressum + Datenschutzerklärung
 */

export interface Service {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  focus?: boolean;
}

export interface ValueProp {
  icon: string;
  title: string;
  text: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  text: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface LegalBlock {
  heading: string;
  text: string;
}

export const site = {
  // ── Identität + Kontakt (zuerst diese bearbeiten) ───────────────────────────
  name: 'ME Digital',
  owner: 'ME Digital',
  role: 'Consulting & Software-Entwicklung',
  // Kurze, menschliche Unterzeile, die unter dem Namen in der Navigation steht.
  kicker: 'Frontend, KI & Full-Stack für wachsende Unternehmen',
  // Kontakt — bitte echte Angaben eintragen.
  email: 'kontakt@me-digital.io',
  phone: '+49 178 88 55 55 4',
  location: 'Stuttgart, Deutschland',
  // Auf null setzen, um ein Feld zu verbergen.
  socials: {
    linkedin: null as string | null,
    github: null as string | null,
    x: null as string | null,
  },

  // ── Landing-Hero ────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'IT-Consulting & Software-Entwicklung',
    headline: 'Software, die hält — und weiterbringt.',
    sub:
      'Wir entwickeln moderne Frontends und bringen KI da ein, wo sie wirklich wirkt — full-stack, praxisnah und ohne Vendor-Lock-in. Klare Beratung, verlässliche Umsetzung.',
    ctaPrimary: 'Kontakt aufnehmen',
    ctaSecondary: 'Leistungen ansehen',
  },

  // ── Credibility-Zahlen (ehrlich halten; nichts übertreiben) ─────────────────
  stats: [
    { value: '20+', label: 'Jahre Erfahrung' },
    { value: '30+', label: 'Projekte umgesetzt' },
    { value: 'Frontend & KI', label: 'unser Fokus' },
    { value: 'Full-Stack', label: 'vom Backend bis zur Oberfläche' },
  ],

  // ── Warum ME Digital ────────────────────────────────────────────────────────
  valueProps: [
    {
      icon: '🎯',
      title: 'Pragmatisch statt über-engineert',
      text: 'Wir lösen Ihr Problem mit dem richtigen Maß — nicht mit überdimensionierten Lösungen, die Sie nur warten müssten.',
    },
    {
      icon: '🧠',
      title: 'Fokus auf Frontend & KI',
      text: 'Zwei Schwerpunkte, in denen wir stark sind — und Full-Stack, wenn das Projekt es verlangt.',
    },
    {
      icon: '⚙️',
      title: 'Automotive & IT',
      text: 'Erfahrung in der Automobilindustrie — von führenden Herstellern über deren Zulieferer bis zu Produktteams — sowie in der IT-Industrie. Wir kennen komplexe, regulierte Umgebungen ebenso wie moderne Softwareteams.',
    },
    {
      icon: '⚡',
      title: 'Klar & direkt',
      text: 'Direkter Draht zum Team, schnelle Rückmeldung und verständliche Kommunikation — kein Support-Karussell.',
    },
  ] as ValueProp[],

  // ── So arbeiten wir ─────────────────────────────────────────────────────────
  process: [
    {
      step: '01',
      title: 'Verstehen',
      text: 'Ein kurzes, unverbindliches Gespräch: Ihre Ziele, Ihr Ist-Zustand, Ihre Schmerzpunkte.',
    },
    {
      step: '02',
      title: 'Planen',
      text: 'Ein klarer Plan nach Priorität und Nutzen — verständlich, mit Ihnen abgestimmt.',
    },
    {
      step: '03',
      title: 'Umsetzen',
      text: 'Wir entwickeln, testen und dokumentieren — inklusive der Informationen, die Sie selbst brauchen.',
    },
    {
      step: '04',
      title: 'Weiterbauen',
      text: 'Optionale Betreuung und Weiterentwicklung, damit nichts aus dem Blick gerät.',
    },
  ] as ProcessStep[],

  // ── Referenzen ──────────────────────────────────────────────────────────────
  // Leer lassen -> der Abschnitt auf der Startseite wird ausgeblendet.
  // Sobald es echte Kundenstimmen gibt, hier einfügen, z. B.:
  //   { quote: '„…“', name: 'Kundenname', role: 'Rolle, Unternehmen' }
  testimonials: [] as Testimonial[],

  // ── Häufige Fragen ──────────────────────────────────────────────────────────
  // Branche wird bewusst abstrakt genannt (keine Firmennamen) — rechtlich
  // unproblematisch. Konkrete Namen erst setzen, wenn eine schriftliche
  // Kundenfreigabe vorliegt.
  faqs: [
    {
      q: 'Mit welchen Unternehmen arbeiten Sie?',
      a: 'Erfahrung in der Automobilindustrie — von führenden Herstellern über deren Zulieferer bis zu Produktteams — sowie in der IT-Industrie und bei wachsenden Unternehmen.',
    },
    {
      q: 'Wie läuft ein Projekt an?',
      a:
        'Mit einem kurzen, unverbindlichen Gespräch. Danach erhalten Sie einen schriftlichen, klar abgegrenzten Plan mit Preisen — bevor etwas umgesetzt wird.',
    },
    {
      q: 'Bieten Sie laufende Betreuung an?',
      a:
        'Ja. Projekte können einmalig sein, oder wir übernehmen auf Wunsch Monitoring, Updates und Support. [An Ihr Angebot anpassen.]',
    },
    {
      q: 'Mit welchen Technologien arbeiten Sie?',
      a:
        'Frontend (Angular, Vite), Backends und APIs, Cloud (AWS) sowie KI zur Prozessoptimierung — mit Claude oder lokalen Modellen, je nach Anforderung.',
    },
  ] as Faq[],

  // ── Rechtliches: Impressum + Datenschutzerklärung ───────────────────────────
  // Pflichtangaben nach § 5 TMG (Impressum) bzw. § 14 TMG / DSGVO (Datenschutz).
  // NICHTS in diesem Block ist Rechtsberatung — vor Veröffentlichung prüfen lassen.
  // Platzhalter [ … ] bitte ersetzen.
  legal: {
    impressum: {
      name: 'Mario Ernst',
      street: 'Madenstr. 29',
      zip: '70619',
      city: 'Stuttgart',
      country: 'Deutschland',
      email: 'kontakt@me-digital.io',
      phone: '+49 178 88 55 55 4',
      // USt-IdNr. NUR, wenn umsatzsteuerpflichtig (§ 27a UStG).
      // Kleinunternehmer (§ 19 UStG) weisen keine USt-IdNr. aus -> null.
      vatId: null as string | null,
      // NUR für juristische Personen (GmbH, KG …). Einzelunternehmer -> null.
      register: null as string | null,
    },
    // Datenschutzerklärung (DSGVO-§ 13/14). Text ist ein Muster mit Platzhaltern.
    datenschutz: [
      {
        heading: 'Verantwortlicher',
        text: 'Verantwortlich für die Datenverarbeitung auf dieser Website ist Mario Ernst, Madenstr. 29, 70619 Stuttgart (Kontakt: [email / Telefon]).',
      },
      {
        heading: 'Erhebung und Verarbeitung',
        text: 'Beim Aufruf der Website erfasst der Webserver automatisch Informationen (Server-Logfiles): IP-Adresse, Datum/Uhrzeit des Zugriffs, aufgerufene Seite, verwendeter Browser und Betriebssystem, Referring-URL. Rechtsgrundlage ist § 14 Abs. 1 TMG bzw. Art. 6 Abs. 1 lit. f DSGVO (Bereitstellung der Website, Sicherheit und Stabilität).',
      },
      {
        heading: 'Kontaktformular',
        text: 'Über das Kontaktformular übermittelte Daten (Name, E-Mail, Nachricht) werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags) bzw. lit. f (unser berechtigtes Interesse). Die Daten werden gelöscht, sobald die Anfrage bearbeitet ist bzw. keine behördliche Aufbewahrungspflicht mehr besteht.',
      },
      {
        heading: 'Cookies & Tracking',
        text: 'Diese Website verwendet keine Cookies und keine Tracking- oder Analyse-Tools (z. B. Google Analytics). Ein Cookie-Banner ist daher nicht erforderlich. [Wenn später Analyse-Tools ergänzt werden, hier anpassen und einen Banner/Consent ergänzen.]',
      },
      {
        heading: 'Ihre Rechte',
        text: 'Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Wenden Sie sich dazu an den Verantwortlichen.',
      },
      {
        heading: 'Beschwerderecht',
        text: 'Sie haben das Recht, sich bei einer Aufsichtsbehörde für den Datenschutz zu beschweren — z. B. beim Datenschutzbeauftragten des Landes, in dem Sie Ihren Wohnsitz oder Ihren gewöhnlichen Aufenthaltsort haben.',
      },
    ] as LegalBlock[],
  },
};

// ── Leistungen (treiben die /services-Seite und die Home-Übersicht) ────────────
export const services: Service[] = [
  {
    id: 'frontend',
    icon: '🎨',
    title: 'Frontend-Entwicklung',
    tagline: 'Moderne, performante Web-Apps',
    description:
      'Zugängliche, schnelle und wartbare Benutzeroberflächen — von der ersten Idee bis in den Produktivbetrieb.',
    bullets: [
      'Angular & Vite',
      'Responsiv & barrierefrei (WCAG)',
      'Performance, SEO & UX',
    ],
    focus: true,
  },
  {
    id: 'ki',
    icon: '🧠',
    title: 'KI & Prozessoptimierung',
    tagline: 'Prozesse mit KI smarter machen',
    description:
      'Wir nutzen KI, um Ihre Prozesse effizienter zu machen — von der Automatisierung wiederkehrender Aufgaben bis zu intelligenten Assistenten, die im Alltag arbeiten.',
    bullets: [
      'Prozessoptimierung mit KI',
      'Claude & lokale Modelle (LLM, RAG)',
      'Workflow-Automatisierung & Assistenten',
      'Beratung zu Tools, Risiken & Datenschutz',
    ],
    focus: true,
  },
  {
    id: 'fullstack',
    icon: '🧩',
    title: 'Full-Stack-Entwicklung',
    tagline: 'Vom Datenmodell bis zur Oberfläche',
    description:
      'End-to-End-Entwicklung — Frontend, Backend, API und Daten — in einem konsistenten, wartbaren Ganzen.',
    bullets: [
      'Backends & REST-/GraphQL-APIs',
      'Datenbanken & Datenmodellierung',
      'Integration von Drittsystemen',
    ],
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud & DevOps',
    tagline: 'Stabil, skalierbar, kosteneffizient',
    description:
      'Infrastruktur, die mitwächst — Deployment, Automatisierung und Betrieb, die im Hintergrund laufen.',
    bullets: [
      'AWS — Deployment & Betrieb',
      'CI/CD & Infrastructure-as-Code',
      'Monitoring & Kostenoptimierung',
    ],
  },
  {
    id: 'beratung',
    icon: '🧭',
    title: 'IT-Beratung & Architektur',
    tagline: 'Richtige Entscheidungen, klar begründet',
    description:
      'Wir klären, was sinnvoll ist — unabhängig, praxisnah und auf Ihre Ziele abgestimmt.',
    bullets: [
      'Audits & Gap-Analyse',
      'Roadmaps & Prioritäten',
      'Vendor- & Lizenzberatung',
    ],
  },
];
