import { Component, ViewEncapsulation, input } from '@angular/core';

export type OjIconSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Une icone.
 *
 * Le glyphe vient d'une police a ligatures — Material Symbols par defaut, mais
 * la famille est un jeton (`--font-icons`), donc remplacable sans toucher a un
 * seul composant. L'application consommatrice charge la police ; la
 * bibliotheque ne telecharge rien d'elle-meme.
 *
 * Toujours `aria-hidden` : une icone double un texte, elle ne le remplace
 * jamais. Quand elle est seule, c'est au bouton qui la contient de porter
 * l'`aria-label`.
 */
@Component({
  selector: 'oj-icon',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './icon.scss',
  template: '<span class="oj-icon__glyph">{{ name() }}</span>',
  host: {
    class: 'oj-icon',
    'aria-hidden': 'true',
    '[class.oj-icon--sm]': 'size() === "sm"',
    '[class.oj-icon--lg]': 'size() === "lg"',
    '[class.oj-icon--xl]': 'size() === "xl"',
  },
})
export class OjIcon {
  /** Le nom du glyphe, par exemple `arrow_forward`. */
  readonly name = input.required<string>();

  readonly size = input<OjIconSize>('md');
}
