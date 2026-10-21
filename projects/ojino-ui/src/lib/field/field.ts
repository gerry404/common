import { Component, computed, input } from '@angular/core';

let nextId = 0;

/**
 * L'etiquette, l'aide et l'erreur autour d'un champ.
 *
 * Le champ lui-meme est projete : le composant ne l'enveloppe pas dans une
 * mecanique de `ControlValueAccessor`, il se contente de l'entourer. C'est ce
 * qui permet d'y mettre un `<input>`, un `<select>`, un `<textarea>` ou un
 * groupe de cases sans trois composants differents.
 *
 * ```html
 * <oj-field label="Adresse email" [error]="errorFor('email')">
 *   <input ojControl type="email" formControlName="email" [invalid]="!!errorFor('email')" />
 * </oj-field>
 * ```
 *
 * L'erreur remplace l'aide quand elle apparait : empiler les deux fait lire
 * deux fois la meme chose, et c'est l'erreur qui compte.
 */
@Component({
  selector: 'oj-field',
  styleUrl: './field.scss',
  templateUrl: './field.html',
  host: { class: 'oj-field' },
})
export class OjField {
  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly error = input<string | null>(null);

  /**
   * L'`id` du champ projete, pour relier l'etiquette.
   *
   * Sans lui, un identifiant est genere : cliquer l'etiquette doit donner le
   * focus au champ, et ce lien ne doit pas dependre du fait que l'appelant y
   * ait pense.
   */
  readonly for = input<string>('');

  protected readonly fallbackId = `oj-field-${nextId++}`;
  protected readonly controlId = computed(() => this.for() || this.fallbackId);
  protected readonly messageId = computed(() => `${this.controlId()}-message`);
}
