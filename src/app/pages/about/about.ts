import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../reveal/reveal';
import { site } from '../../content';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Reveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly site = site;
}
