import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OjSegmented, OjToastHost } from 'ojino-ui';

import { ThemeChoice, ThemeService } from './shared/theme/theme.service';

interface NavEntry {
  readonly path: string;
  readonly label: string;
}

/**
 * L'atelier.
 *
 * Notre catalogue de composants. Storybook ne supportant pas Angular 22, c'est
 * une application Angular ordinaire : meme version, memes jetons, meme
 * compilateur que la bibliotheque — elle ne peut donc pas montrer autre chose
 * que ce que les applications verront.
 */
@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, OjSegmented, OjToastHost],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly theme = inject(ThemeService);

  protected readonly choice = this.theme.choice;

  protected readonly themes: readonly { value: ThemeChoice; label: string }[] = [
    { value: 'light', label: 'Clair' },
    { value: 'system', label: 'Systeme' },
    { value: 'dark', label: 'Sombre' },
  ];

  protected readonly entries = signal<readonly NavEntry[]>([
    { path: 'jetons', label: 'Jetons' },
    { path: 'boutons', label: 'Boutons' },
    { path: 'champs', label: 'Champs' },
    { path: 'segments', label: 'Segments' },
    { path: 'surfaces', label: 'Surfaces' },
    { path: 'retours', label: 'Retours' },
  ]);
}
