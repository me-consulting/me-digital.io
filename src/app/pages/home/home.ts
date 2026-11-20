import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icon/icon';
import { Reveal } from '../../reveal/reveal';
import { CountUp } from '../../count-up/count-up';
import { site, services } from '../../content';

@Component({
  selector: 'app-home',
  imports: [RouterLink, IconComponent, Reveal, CountUp],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly site = site;
  readonly services = services;
}
