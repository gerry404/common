import { Component, booleanAttribute, input } from '@angular/core';

/**
 * Une surface.
 *
 * Pas d'en-tete ni de pied imposes : les trois quarts des cartes du produit
 * n'en ont pas, et celles qui en ont les composent elles-memes. Un composant
 * qui impose sa structure finit toujours contourne.
 */
@Component({
  selector: 'oj-card',
  styleUrl: './card.scss',
  template: '<ng-content />',
  host: {
    class: 'oj-card',
    '[class.oj-card--flat]': 'flat()',
    '[class.oj-card--interactive]': 'interactive()',
  },
})
export class OjCard {
  /** Sans ombre : pour une carte posee sur un fond deja distinct. */
  readonly flat = input(false, { transform: booleanAttribute });

  /** Reagit au survol. A reserver aux cartes reellement cliquables. */
  readonly interactive = input(false, { transform: booleanAttribute });
}
