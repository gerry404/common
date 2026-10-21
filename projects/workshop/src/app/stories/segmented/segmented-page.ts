import { Component, signal } from '@angular/core';
import { OjSegmented } from 'ojino-ui';

import { Story } from '../../shared/story/story';

@Component({
  imports: [Story, OjSegmented],
  selector: 'wk-segmented-page',
  styleUrl: './segmented-page.scss',
  templateUrl: './segmented-page.html',
})
export class SegmentedPage {
  protected readonly severity = signal<number | null>(0);
  protected readonly cycle = signal<string | null>('COLLEGE');

  protected readonly severities: readonly { value: number; label: string }[] = [
    { value: 0, label: 'Ca va' },
    { value: 1, label: 'Un peu' },
    { value: 2, label: 'Beaucoup' },
    { value: 3, label: 'Bloque' },
  ];

  protected readonly cycles: readonly { value: string; label: string }[] = [
    { value: 'EARLY_YEARS', label: 'Maternelle' },
    { value: 'COLLEGE', label: 'College' },
    { value: 'HIGH_SCHOOL', label: 'Lycee' },
    { value: 'PREPA', label: 'Prepa' },
    { value: 'UNIVERSITY', label: 'Universite' },
  ];
}
