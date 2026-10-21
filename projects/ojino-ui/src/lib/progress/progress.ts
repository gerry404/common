import { Component, computed, input } from '@angular/core';

/**
 * Une barre de progression.
 *
 * Sans `value`, elle est indeterminee : on ne sait pas combien de temps, on le
 * dit. Avec `value`, elle porte les attributs ARIA qu'un lecteur d'ecran
 * attend, et la valeur est bornee ici plutot que de faire confiance a
 * l'appelant.
 */
@Component({
  selector: 'oj-progress',
  styleUrl: './progress.scss',
  templateUrl: './progress.html',
  host: {
    class: 'oj-progress',
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'percent()',
    '[class.oj-progress--indeterminate]': 'percent() === null',
  },
})
export class OjProgress {
  readonly value = input<number | null>(null);

  protected readonly percent = computed(() => {
    const value = this.value();
    if (value === null) {
      return null;
    }
    return Math.max(0, Math.min(100, Math.round(value)));
  });
}
