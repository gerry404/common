import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type ThemeChoice = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'ojino-atelier-theme';

/**
 * Le theme de l'atelier.
 *
 * Il existe pour une raison : un design system qui n'a jamais ete regarde en
 * sombre est un design system a moitie teste. L'interrupteur pose
 * `data-theme` sur la racine, exactement comme le ferait l'application.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly choice = signal<ThemeChoice>(this.restore());

  constructor() {
    effect(() => this.apply(this.choice()));
  }

  private apply(choice: ThemeChoice): void {
    if (!this.isBrowser) {
      return;
    }

    const root = this.document.documentElement;
    if (choice === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', choice);
    }

    // Le stockage peut lever : navigation privee, donnees de site bloquees.
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Un theme non retenu reste un theme applique.
    }
  }

  private restore(): ThemeChoice {
    if (!this.isBrowser) {
      return 'system';
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // Ignore : on retombe sur le reglage du systeme.
    }
    return 'system';
  }
}
