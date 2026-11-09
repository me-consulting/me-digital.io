import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { services, site } from '../../content';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  readonly services = services;
  readonly site = site;
}
