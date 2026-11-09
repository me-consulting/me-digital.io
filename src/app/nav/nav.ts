import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { site } from '../content';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  readonly brand = site.name;
  readonly links = [
    { label: 'Start', href: '' },
    { label: 'Leistungen', href: 'services' },
    { label: 'Über uns', href: 'about' },
    { label: 'Kontakt', href: 'contact' },
  ];
  readonly open = signal(false);

  toggle(): void {
    this.open.update((o) => !o);
  }

  close(): void {
    this.open.set(false);
  }
}
