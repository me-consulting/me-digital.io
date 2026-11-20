import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { site } from '../../content';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly site = site;
}
