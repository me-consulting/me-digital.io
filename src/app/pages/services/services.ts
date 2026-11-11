import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icon/icon';
import { services, site } from '../../content';

@Component({
  selector: 'app-services',
  imports: [RouterLink, IconComponent],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  readonly services = services;
  readonly site = site;
}
