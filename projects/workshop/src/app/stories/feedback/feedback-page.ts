import { Component, inject, signal } from '@angular/core';
import { OjButton, OjIcon, OjProgress, OjSpinner, OjToastService } from 'ojino-ui';

import { Story } from '../../shared/story/story';

@Component({
  imports: [Story, OjButton, OjIcon, OjProgress, OjSpinner],
  selector: 'wk-feedback-page',
  styleUrl: './feedback-page.scss',
  templateUrl: './feedback-page.html',
})
export class FeedbackPage {
  private readonly toasts = inject(OjToastService);

  protected readonly progress = signal(35);

  protected advance(step: number): void {
    this.progress.update((value) => value + step);
  }

  protected notify(tone: 'info' | 'success' | 'error'): void {
    const messages = {
      info: 'Ton brouillon est enregistre.',
      success: 'Profil mis a jour.',
      error: 'Le serveur est injoignable. Verifie ta connexion.',
    } as const;

    this.toasts[tone](messages[tone]);
  }
}
