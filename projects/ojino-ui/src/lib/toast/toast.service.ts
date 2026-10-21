import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type OjToastTone = 'info' | 'success' | 'error';

export interface OjToast {
  readonly id: number;
  readonly tone: OjToastTone;
  readonly message: string;
}

const DURATIONS: Readonly<Record<OjToastTone, number>> = {
  info: 4000,
  success: 4000,
  // Plus longtemps : une erreur demande parfois d'etre relue.
  error: 7000,
};

const MAX_VISIBLE = 3;

let nextId = 0;

/**
 * Les messages ephemeres.
 *
 * Le service detient la liste, un seul `oj-toast-host` l'affiche. Les
 * composants appellent `error()` sans savoir ou le message apparaitra ni
 * combien de temps il restera.
 *
 * Aucun minuteur n'est programme pendant le rendu serveur : un `setTimeout`
 * en attente retarderait la stabilite de l'application, et de toute facon un
 * message ephemere n'a aucun sens dans un HTML pre-rendu.
 */
@Injectable({ providedIn: 'root' })
export class OjToastService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly items = signal<readonly OjToast[]>([]);

  readonly toasts = this.items.asReadonly();

  info(message: string): void {
    this.push('info', message);
  }

  success(message: string): void {
    this.push('success', message);
  }

  error(message: string): void {
    this.push('error', message);
  }

  dismiss(id: number): void {
    this.items.update((list) => list.filter((toast) => toast.id !== id));
  }

  clear(): void {
    this.items.set([]);
  }

  private push(tone: OjToastTone, message: string): void {
    const toast: OjToast = { id: nextId++, tone, message };

    // On empile par le bas et on jette les plus anciens : trois messages
    // simultanes sont deja beaucoup, dix seraient illisibles.
    this.items.update((list) => [...list, toast].slice(-MAX_VISIBLE));

    if (this.isBrowser) {
      setTimeout(() => this.dismiss(toast.id), DURATIONS[tone]);
    }
  }
}
