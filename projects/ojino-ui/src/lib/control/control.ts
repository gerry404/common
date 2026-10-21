import { Directive, booleanAttribute, input } from '@angular/core';

/**
 * Habille un champ natif.
 *
 * ```html
 * <input ojControl type="email" formControlName="email" />
 * <textarea ojControl rows="3"></textarea>
 * <select ojControl formControlName="day"> … </select>
 * ```
 *
 * Aucune valeur n'est interceptee : `formControlName`, `ngModel`, `required`,
 * `autocomplete` et le reste passent directement a l'element. La directive
 * n'ajoute que l'apparence et `aria-invalid`.
 *
 * `invalid` est pilote par le composant parent, jamais par la pseudo-classe
 * `:invalid` du navigateur : celle-ci s'allume des la premiere frappe, avant
 * que l'utilisateur ait fini d'ecrire.
 */
@Directive({
  selector: 'input[ojControl], textarea[ojControl], select[ojControl]',
  host: {
    class: 'oj-control',
    '[attr.aria-invalid]': 'invalid() || null',
  },
})
export class OjControl {
  readonly invalid = input(false, { transform: booleanAttribute });
}
