import { Directive, booleanAttribute, computed, input } from '@angular/core';

/**
 * Les cinq niveaux d'emphase. Pas de sixieme : au-dela, plus personne ne sait
 * lequel est le bouton principal.
 */
export type OjButtonAppearance = 'filled' | 'outlined' | 'ghost' | 'soft' | 'danger';

export type OjButtonSize = 'md' | 'sm';

/**
 * Un bouton.
 *
 * C'est une directive et non un composant : elle se pose sur un `<button>` ou
 * un `<a>` natif. Le clavier, `type="submit"`, `disabled`, `routerLink` et le
 * menu contextuel du navigateur continuent de fonctionner sans qu'on les
 * reimplemente — et il n'y a pas d'element enveloppant qui casserait une
 * grille ou un flex.
 *
 * ```html
 * <button ojButton type="submit">Enregistrer</button>
 * <a ojButton="outlined" routerLink="/connexion">Se connecter</a>
 * <button ojButton="ghost" size="sm" icon aria-label="Fermer">
 *   <oj-icon name="close" />
 * </button>
 * ```
 */
@Directive({
  selector: 'button[ojButton], a[ojButton]',
  host: {
    class: 'oj-button',
    '[class.oj-button--filled]': 'appearance() === "filled"',
    '[class.oj-button--outlined]': 'appearance() === "outlined"',
    '[class.oj-button--ghost]': 'appearance() === "ghost"',
    '[class.oj-button--soft]': 'appearance() === "soft"',
    '[class.oj-button--danger]': 'appearance() === "danger"',
    '[class.oj-button--sm]': 'size() === "sm"',
    '[class.oj-button--block]': 'block()',
    '[class.oj-button--icon]': 'icon()',
    '[attr.aria-busy]': 'loading() || null',
  },
})
export class OjButton {
  /**
   * L'apparence, lisible directement dans le selecteur :
   * `<button ojButton="outlined">`. Une valeur vide donne `filled`, ce qui
   * fait du cas le plus courant le cas le plus court a ecrire.
   */
  readonly ojButton = input<OjButtonAppearance | ''>('');

  readonly size = input<OjButtonSize>('md');

  /** Carre, pour une icone seule. Exige un `aria-label` sur l'element. */
  readonly icon = input(false, { transform: booleanAttribute });

  /** Pleine largeur. Utile sur mobile, ou dans une pile de formulaire. */
  readonly block = input(false, { transform: booleanAttribute });

  /**
   * Annonce une action en cours.
   *
   * Ne desactive pas le bouton : un bouton desactive perd le focus, et le
   * lecteur d'ecran de l'utilisateur se retrouve nulle part. `aria-busy`
   * informe sans deplacer personne.
   */
  readonly loading = input(false, { transform: booleanAttribute });

  protected readonly appearance = computed<OjButtonAppearance>(
    () => this.ojButton() || 'filled',
  );
}
