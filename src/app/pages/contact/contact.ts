import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { site } from '../../content';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly site = site;
  readonly faqs = site.faqs;

  // Simple client-side form. Wire the submit() handler to your email API
  // (Formspree, your own endpoint, etc.) before going live.
  readonly form = signal({ name: '', email: '', topic: 'Allgemein', message: '' });
  readonly sent = signal(false);
  readonly error = signal('');
  readonly topics = ['Allgemein', 'Neues Projekt', 'Laufende Betreuung', 'Sicherheit'];

  submit(): void {
    const f = this.form();
    if (!f.name.trim() || !f.email.trim() || !f.message.trim()) {
      this.error.set('Bitte geben Sie Name, eine gültige E-Mail-Adresse und eine Nachricht an.');
      this.sent.set(false);
      return;
    }
    this.error.set('');
    // TODO: an Ihren Backend-/E-Mail-Dienst senden. Bislang: Simuliert.
    console.info('Kontaktformular abgesendet', f);
    this.sent.set(true);
    this.form.set({ name: '', email: '', topic: 'Allgemein', message: '' });
  }
}
