import { Component, input } from '@angular/core';

/**
 * Un cas d'usage, isole.
 *
 * L'equivalent d'une « story » : un titre, une note qui dit pourquoi ce cas
 * existe, et un cadre neutre ou le composant est seul. Le cadre est volontaire
 * — un composant juge au milieu d'une page ne se juge pas.
 */
@Component({
  selector: 'wk-story',
  styleUrl: './story.scss',
  templateUrl: './story.html',
  host: { class: 'wk-story' },
})
export class Story {
  readonly name = input.required<string>();
  readonly note = input<string>('');

  /** Dispose le contenu en ligne plutot qu'empile. */
  readonly row = input<boolean>(false);
}
