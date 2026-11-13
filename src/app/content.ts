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
  // E-Mail (Domain-Postfach aktiv).
  email: 'mail@me-digital.io',
  phone: '+49 711 12893038',
  location: 'Stuttgart, Deutschland',
  // Kontaktformular: Web3Forms — kein eigenes Backend nötig.
  // access_key stammt aus dem Web3Forms-Dashboard (Formular 043ddefc-…).
  // formEnabled auf false setzen, um das Formular wieder auszuhalten.
  form: {
    provider: 'web3forms',
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '043ddefc-7f74-402b-bffe-7b746d949d82',
    fromName: 'ME Digital',
    subject: 'Neue Kontaktanfrage — ME Digital',
  },
  formEnabled: true,
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
    { value: '35+', label: 'Projekte umgesetzt' },
    { value: 'Frontend & KI', label: 'unser Fokus' },
    { value: 'Full-Stack', label: 'vom Backend bis zur Oberfläche' },
  ],

  // ── Warum ME Digital ────────────────────────────────────────────────────────
  valueProps: [
    {
      icon: 'target',
      title: 'Pragmatisch statt über-engineert',
      text: 'Wir lösen Ihr Problem mit dem richtigen Maß — nicht mit überdimensionierten Lösungen, die Sie nur warten müssten.',
    },
    {
      icon: 'focus',
      title: 'Fokus auf Frontend & KI',
      text: 'Zwei Schwerpunkte, in denen wir stark sind — und Full-Stack, wenn das Projekt es verlangt.',
    },
    {
      icon: 'settings',
      title: 'Automotive & IT',
      text: 'Erfahrung in der Automobilindustrie — von führenden Herstellern über deren Zulieferer bis zu Produktteams — sowie in der IT-Industrie. Wir kennen komplexe, regulierte Umgebungen ebenso wie moderne Softwareteams.',
    },
    {
      icon: 'zap',
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
      q: 'In welchen Branchen haben Sie Erfahrung?',
      a:
        'Wir bringen Erfahrung aus der Automobilindustrie — von führenden Herstellern über deren Zulieferer bis zu Produktteams — ebenso aus der IT-Industrie und bei wachsenden Unternehmen.',
    },
    {
      q: 'Wie läuft ein Projekt an?',
      a:
        'Mit einem kurzen, unverbindlichen Gespräch. Danach erhalten Sie einen schriftlichen, klar abgegrenzten Plan mit Preisen — bevor etwas umgesetzt wird.',
    },
    {
      q: 'Bieten Sie laufende Betreuung an?',
      a:
        'Ja. Neben einmaligen Projekten bieten wir laufende Betreuung an — Monitoring, Updates und Support, damit Ihre Lösung stabil, aktuell und performant bleibt. So können Sie sich auf Ihr Kerngeschäft konzentrieren, während wir den laufenden Betrieb, die Wartung und die Weiterentwicklung übernehmen. Umfang und Takt passen wir gemeinsam an Ihre Anforderungen an.',
    },
    {
      q: 'Mit welchen Technologien arbeiten Sie?',
      a:
        'Frontend (Angular, Vue.js), Backends in Java und Kotlin, APIs, Cloud (AWS) und KI zur Prozessoptimierung — mit Claude oder lokalen Modellen, je nach Anforderung.',
    },
  ] as Faq[],

  // ── Rechtliches: Impressum + Datenschutzerklärung ───────────────────────────
  // Pflichtangaben nach § 5 DDG (Impressum) bzw. DSGVO (Datenschutz).
  // TMG wurde am 14.05.2024 durch das Digitale-Dienste-Gesetz (DDG) aufgehoben —
  // daher keine „§ X TMG"-Angaben mehr (alte Zitate sind Abmahnfallen).
  // NICHTS in diesem Block ist Rechtsberatung — vor Veröffentlichung prüfen lassen.
  // Platzhalter [ … ] bitte ersetzen.
  legal: {
    impressum: {
      name: 'Mario Ernst',
      street: 'Madenstr. 29',
      zip: '70619',
      city: 'Stuttgart',
      country: 'Deutschland',
      email: 'mail@me-digital.io',
      phone: '+49 711 12893038',
      // USt-IdNr. (umsatzsteuerpflichtig, § 27a UStG).
      vatId: 'DE304454733',
      // NUR für juristische Personen (GmbH, KG …). Einzelunternehmer -> null.
      register: null as string | null,
    },
    // Datenschutzerklärung (DSGVO-§ 13/14). Text ist ein Muster mit Platzhaltern.
    datenschutz: [
      {
        heading: 'Verantwortlicher',
        text: 'Verantwortlich für die Datenverarbeitung auf dieser Website ist Mario Ernst, Madenstr. 29, 70619 Stuttgart. Kontakt: Telefon +49 711 12893038, E-Mail mail@me-digital.io.',
      },
      {
        heading: 'Erhebung und Verarbeitung',
        text: 'Beim Aufruf der Website erfasst der Webserver automatisch Informationen (Server-Logfiles): IP-Adresse, Datum/Uhrzeit des Zugriffs, aufgerufene Seite, verwendeter Browser und Betriebssystem, Referring-URL. Die Übertragung erfolgt über eine SSL-/TLS-verschlüsselte Verbindung (HTTPS). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Bereitstellung der Website, Sicherheit und Stabilität).',
      },
      {
        heading: 'Kontaktformular',
        text: 'Über das Kontaktformular übermittelte Daten (Name, E-Mail, Nachricht) werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags) bzw. lit. f (unser berechtigtes Interesse). Die Daten werden gelöscht, sobald die Anfrage bearbeitet ist bzw. keine behördliche Aufbewahrungspflicht mehr besteht.',
      },
      {
        heading: 'Cookies & Tracking',
        text:
          'Diese Website verwendet keine Cookies und keine Tracking- oder Analyse-Tools (z. B. Google Analytics). Ein Cookie-Banner ist daher nicht erforderlich.',
      },
      {
        heading: 'Hosting & Auftragsverarbeiter',
        text: 'Für den Betrieb dieser Website nutzen wir den Hosting-Anbieter GitHub (GitHub Pages). Die personenbezogenen Daten (insbesondere Server-Logfiles) werden im Rahmen einer Auftragsverarbeitung gemäß Art. 28 DSGVO verarbeitet; ein Auftragsverarbeitungsvertrag liegt vor. Daten werden nicht an Dritte weitergegeben, es sei denn, dies ist zur Beantwortung einer Anfrage oder zur Aufrechterhaltung des Betriebs erforderlich.',
      },
      {
        heading: 'Datenübermittlung in die USA / andere Drittländer',
        text: 'Unser Hosting-Anbieter (GitHub, USA) und, sobald das Kontaktformular aktiv ist, unser Formular-Anbieter (Web3Forms, Sitz Indien/USA) verarbeiten personenbezogene Daten außerhalb der EU/EEA. Personenbezogene Daten können daher in die Vereinigten Staaten, nach Indien oder in ein anderes Land außerhalb der EU/EEA übermittelt werden. Die Übertragung stützt sich auf die EU-Standardvertragsklauseln (Art. 46 DSGVO); für GitHub liegt zusätzlich der Angemessenheitsbeschluss der EU zum „EU-U.S. Data Privacy Framework" vor. Web3Forms (Betreiber: Web3Creative, Indien) verarbeitet die Daten als Auftragsverarbeiter gemäß Art. 28 DSGVO auf Basis seines Datenverarbeitungsvertrags (DPA: https://www.web3forms.com/dpa) und leitet die Formulareingaben an uns weiter, ohne sie über das für den Service erforderliche Maß hinaus zu speichern (Server-Logs werden nach dessen Angaben regelmäßig gelöscht; https://www.web3forms.com/privacy). Die einschlägigen Standardvertragsklauseln (Durchführungsbeschluss (EU) 2021/914) können über die Europäische Kommission abgerufen werden.',
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
    // Pflicht-/Standardangaben im Impressum:
    //  § 18 Abs. 2 MStV (Inhaltlich Verantwortlicher) + Haftung, Links, Urheberrecht.
    //  Quelle: eRecht24 Muster-Impressum „Gewerbetreibende (ohne Handelsregistereintrag)".
    impressumClauses: [
      {
        heading: 'Inhaltlich Verantwortlicher',
        text: 'Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV: Mario Ernst, ' +
          'Madenstr. 29, 70619 Stuttgart (Kontakt s. o.).',
      },
      {
        heading: 'Haftungsausschluss',
        text: 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
      },
      {
        heading: 'Haftungsausschluss für Links',
        text: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
      },
      {
        heading: 'Urheberrechte',
        text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
      },
    ] as LegalBlock[],
  },
};

// ── Leistungen (treiben die /services-Seite und die Home-Übersicht) ────────────
export const services: Service[] = [
  {
    id: 'frontend',
    icon: 'code',
    title: 'Frontend-Entwicklung',
    tagline: 'Moderne, performante Web-Apps',
    description:
      'Zugängliche, schnelle und wartbare Benutzeroberflächen — von der ersten Idee bis in den Produktivbetrieb.',
    bullets: [
      'Angular & Vue.js',
      'Responsiv & barrierefrei (WCAG)',
      'Performance, SEO & UX',
    ],
    focus: true,
  },
  {
    id: 'ki',
    icon: 'sparkles',
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
    icon: 'layers',
    title: 'Full-Stack-Entwicklung',
    tagline: 'Vom Datenmodell bis zur Oberfläche',
    description:
      'End-to-End-Entwicklung — Frontend, Backend, API und Daten — in einem konsistenten, wartbaren Ganzen.',
    bullets: [
      'Backends in Java & Kotlin, REST-/GraphQL-APIs',
      'Datenbanken & Datenmodellierung',
      'Integration von Drittsystemen',
    ],
  },
  {
    id: 'cloud',
    icon: 'cloud',
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
    icon: 'compass',
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
