import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Start — ME Digital',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
    title: 'Leistungen — ME Digital',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'Über uns — ME Digital',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Kontakt — ME Digital',
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/impressum/impressum').then((m) => m.Impressum),
    title: 'Impressum — ME Digital',
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./pages/datenschutz/datenschutz').then((m) => m.Datenschutz),
    title: 'Datenschutzerklärung — ME Digital',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
];
