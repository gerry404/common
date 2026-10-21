import { Component, inject } from '@angular/core';

import { OjButton } from '../button/button';
import { OjIcon } from '../icon/icon';
import { OjToastService, OjToastTone } from './toast.service';

const ICONS: Readonly<Record<OjToastTone, string>> = {
  info: 'info',
  success: 'check_circle',
  error: 'error',
};

/**
 * L'endroit ou les messages ephemeres s'affichent.
 *
 * A placer une seule fois, dans le cadre de l'application. La region est
 * `aria-live="polite"` : un lecteur d'ecran annonce le message sans couper ce
 * qu'il etait en train de lire.
 */
@Component({
  imports: [OjButton, OjIcon],
  selector: 'oj-toast-host',
  styleUrl: './toast-host.scss',
  templateUrl: './toast-host.html',
  host: {
    class: 'oj-toast-host',
    role: 'status',
    'aria-live': 'polite',
  },
})
export class OjToastHost {
  private readonly service = inject(OjToastService);

  protected readonly toasts = this.service.toasts;

  protected iconFor(tone: OjToastTone): string {
    return ICONS[tone];
  }

  protected dismiss(id: number): void {
    this.service.dismiss(id);
  }
}
