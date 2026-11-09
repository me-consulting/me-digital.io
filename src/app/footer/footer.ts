import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { site, services } from '../content';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly site = site;
  readonly services = services;
  readonly year = new Date().getFullYear();
}
