import { Component, input, model } from '@angular/core';

export interface OjSegment<T> {
  readonly value: T;
  readonly label: string;
}

let nextGroup = 0;

/**
 * Un selecteur segmente : quelques options exclusives, toutes visibles.
 *
 * Construit sur de vrais `<input type="radio">` caches derriere leurs
 * etiquettes. Les fleches du clavier, la navigation par Tab qui saute le
 * groupe entier, l'annonce « 2 sur 4 » par le lecteur d'ecran : tout vient du
 * navigateur. Un groupe de `<button>` avec `role="radio"` demanderait de
 * reimplementer les quatre, et se tromperait sur au moins un.
 *
 * ```html
 * <oj-segmented [segments]="niveaux" [(value)]="choix" label="Difficulte" />
 * ```
 */
@Component({
  selector: 'oj-segmented',
  styleUrl: './segmented.scss',
  templateUrl: './segmented.html',
  host: {
    class: 'oj-segmented',
    role: 'radiogroup',
    '[attr.aria-label]': 'label() || null',
  },
})
export class OjSegmented<T> {
  readonly segments = input.required<readonly OjSegment<T>[]>();
  readonly value = model<T | null>(null);
  readonly label = input<string>('');

  /**
   * Le `name` partage par les radios du groupe.
   *
   * C'est lui qui rend les options exclusives. Deux groupes sur la meme page
   * doivent donc porter des noms differents, d'ou le compteur : sans lui, le
   * second groupe desactiverait le choix du premier.
   */
  protected readonly group = `oj-segmented-${nextGroup++}`;

  protected isChecked(segment: OjSegment<T>): boolean {
    return this.value() === segment.value;
  }

  protected select(segment: OjSegment<T>): void {
    this.value.set(segment.value);
  }
}
