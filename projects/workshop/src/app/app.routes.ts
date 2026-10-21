import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jetons' },
  {
    path: 'jetons',
    title: 'Jetons — Atelier Ojino',
    loadComponent: () => import('./stories/tokens/tokens-page').then((m) => m.TokensPage),
  },
  {
    path: 'boutons',
    title: 'Boutons — Atelier Ojino',
    loadComponent: () => import('./stories/button/button-page').then((m) => m.ButtonPage),
  },
  {
    path: 'champs',
    title: 'Champs — Atelier Ojino',
    loadComponent: () => import('./stories/field/field-page').then((m) => m.FieldPage),
  },
  {
    path: 'segments',
    title: 'Segments — Atelier Ojino',
    loadComponent: () =>
      import('./stories/segmented/segmented-page').then((m) => m.SegmentedPage),
  },
  {
    path: 'surfaces',
    title: 'Surfaces — Atelier Ojino',
    loadComponent: () => import('./stories/card/card-page').then((m) => m.CardPage),
  },
  {
    path: 'retours',
    title: 'Retours — Atelier Ojino',
    loadComponent: () =>
      import('./stories/feedback/feedback-page').then((m) => m.FeedbackPage),
  },
  { path: '**', redirectTo: 'jetons' },
];
