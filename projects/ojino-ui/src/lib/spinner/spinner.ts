import { Component, input } from '@angular/core';

/**
 * Un indicateur d'attente court.
 *
 * Dessine en CSS et non en SVG anime : une bordure qui tourne coute une
 * propriete, et rien a telecharger. Pour une attente longue ou chiffrable,
 * `oj-progress` dit plus.
 */
@Component({
  selector: 'oj-spinner',
  styleUrl: './spinner.scss',
  template: '',
  host: {
    class: 'oj-spinner',
    role: 'status',
    '[attr.aria-label]': 'label()',
    '[class.oj-spinner--sm]': 'size() === "sm"',
  },
})
export class OjSpinner {
  readonly size = input<'sm' | 'md'>('md');
  readonly label = input<string>('Chargement');
}
