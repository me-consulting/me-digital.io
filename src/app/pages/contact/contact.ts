import { Component, signal } from '@angular/core';
import { site } from '../../content';

@Component({
  selector: 'app-contact',
  // Kein FormsModule — das Formular läuft über Signals ([value]/(input)).
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly site = site;
  readonly faqs = site.faqs;

  // Signal-Felder (kein ngModel).
  readonly name = signal('');
  readonly email = signal('');
  readonly topic = signal('Allgemein');
  readonly message = signal('');
  readonly honeypot = signal(false); // Web3Forms-Spamschutz (verstecktes Feld)

  readonly sent = signal(false);
  readonly error = signal('');
  readonly sending = signal(false);
  readonly sentName = signal(''); // Vorname fuer die persoenliche Erfolgsmeldung
  readonly topics = ['Allgemein', 'Neues Projekt', 'Laufende Betreuung', 'Sicherheit'];

  // Formular zuruecksetzen (Button "Weitere Nachricht senden").
  newMessage(): void {
    this.sent.set(false);
    this.sentName.set('');
    this.error.set('');
  }

  // Sendet das Formular an Web3Forms (Konfiguration in content.ts → site.form).
  // Web3Forms leitet die Nachricht an das hinterlegte E-Mail-Postfach weiter.
  async submit(event: Event): Promise<void> {
    // Formular native Submit-Verhalten stoppen (sonst Reload statt Erfolgs-Panel).
    event.preventDefault();
    if (!this.name().trim() || !this.email().trim() || !this.message().trim()) {
      this.error.set('Bitte geben Sie Name, eine gültige E-Mail-Adresse und eine Nachricht an.');
      this.sent.set(false);
      return;
    }

    // Honeypot: das versteckte Feld ist für Menschen unsichtbar. Füllt ein Bot
    // es aus, lassen wir die Anfrage still fallen (kein echter Versand).
    if (this.honeypot()) {
      this.sent.set(true);
      this.honeypot.set(false);
      return;
    }

    this.error.set('');
    this.sending.set(true);

    const body = new FormData();
    body.append('access_key', site.form.accessKey);
    // E-Mail-Präsentation (Web3Forms): sauberer Absender, Reply-To → Kunde,
    // deutsche Feldbezeichnungen für eine natürliche, lesbare Mail.
    body.append('from_name', site.form.fromName);
    body.append('replyto', this.email().trim());
    body.append('Name', this.name().trim());
    body.append('E-Mail', this.email().trim());
    body.append('Angelegenheit', this.topic());
    body.append('Nachricht', this.message().trim());
    body.append('subject', site.form.subject);
    // Kein botcheck-Wert nötig: Web3Forms prüft Spam zusätzlich serverseitig.

    try {
      const res = await fetch(site.form.endpoint, { method: 'POST', body });
      const data = (await res.json().catch(() => null)) as { status?: string; message?: string } | null;
      if (res.ok && data?.status === 'success') {
        // Vorname vor dem Zuruecksetzen sichern -> persoenliche Begruesung.
        this.sentName.set(this.name().trim().split(/\s+/)[0]);
        this.sent.set(true);
        this.name.set('');
        this.email.set('');
        this.topic.set('Allgemein');
        this.message.set('');
      } else {
        // Niemals den rohen (englischen) Web3Forms-Text anzeigen — immer auf Deutsch.
        this.error.set(this.deError(data?.status, data?.message));
      }
    } catch {
      console.error('[contact] Netzwerkfehler beim Versand an Web3Forms');
      this.error.set(this.deError('network'));
    } finally {
      this.sending.set(false);
    }
  }

  // Web3Forms antwortet oft auf Englisch. Der Nutzer sieht immer eine deutsche
  // Meldung; die Rohantwort landet nur in der Console (Debugging, keine Exposition).
  private deError(status?: string, raw?: string): string {
    const key = ((raw || '') + ' ' + (status || '')).toLowerCase();
    if (raw) {
      console.error('[contact] Web3Forms-Antwort:', status, raw);
    }
    if (/verif|verify|confirm|bestätig/i.test(key)) {
      return 'Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse im Web3Forms-Dashboard — danach senden Sie die Nachricht erneut.';
    }
    if (/invalid|expired|access.?key|unauthorized|forbidden|not allowed|pro plan|403|401/i.test(key)) {
      return 'Der Versand konnte nicht abgeschlossen werden. Bitte schreiben Sie uns direkt an ' + this.site.email + '.';
    }
    return 'Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut — oder schreiben Sie uns direkt an ' + this.site.email + '.';
  }
}
