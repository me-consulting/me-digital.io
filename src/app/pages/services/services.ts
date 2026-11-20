import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icon/icon';
import { Reveal } from '../../reveal/reveal';
import { services, site } from '../../content';

@Component({
  selector: 'app-services',
  imports: [RouterLink, IconComponent, Reveal],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  readonly services = services;
  readonly site = site;
}
