import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { site, services } from '../../content';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly site = site;
  readonly services = services;
}
