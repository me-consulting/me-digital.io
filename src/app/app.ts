import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { Footer } from './footer/footer';
import { ScrollManager } from './scroll-manager/scroll-manager';

@Component({
  imports: [RouterOutlet, Nav, Footer, ScrollManager],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
