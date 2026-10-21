import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OjControl, OjField, OjIcon } from 'ojino-ui';

import { Story } from '../../shared/story/story';

@Component({
  imports: [FormsModule, Story, OjControl, OjField, OjIcon],
  selector: 'wk-field-page',
  styleUrl: './field-page.scss',
  templateUrl: './field-page.html',
})
export class FieldPage {
  protected readonly email = signal('');
  protected readonly day = signal('WEDNESDAY');
  protected readonly passwordVisible = signal(false);

  protected readonly days: readonly { value: string; label: string }[] = [
    { value: 'MONDAY', label: 'Lundi' },
    { value: 'TUESDAY', label: 'Mardi' },
    { value: 'WEDNESDAY', label: 'Mercredi' },
    { value: 'THURSDAY', label: 'Jeudi' },
    { value: 'FRIDAY', label: 'Vendredi' },
  ];

  protected togglePassword(): void {
    this.passwordVisible.update((visible) => !visible);
  }
}
