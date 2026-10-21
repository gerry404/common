import { Component, signal } from '@angular/core';
import { OjButton, OjButtonAppearance, OjIcon, OjSpinner } from 'ojino-ui';

import { Story } from '../../shared/story/story';

@Component({
  imports: [Story, OjButton, OjIcon, OjSpinner],
  selector: 'wk-button-page',
  styleUrl: './button-page.scss',
  templateUrl: './button-page.html',
})
export class ButtonPage {
  protected readonly appearances: readonly OjButtonAppearance[] = [
    'filled',
    'outlined',
    'ghost',
    'soft',
    'danger',
  ];

  protected readonly loading = signal(false);

  /** Montre l'etat occupe sans backend : deux secondes suffisent a le voir. */
  protected simulate(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 2000);
  }
}
