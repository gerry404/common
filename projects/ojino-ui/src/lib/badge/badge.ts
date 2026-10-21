import { Component, input } from '@angular/core';

export type OjBadgeTone = 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger';

/** Une etiquette courte : un statut, un comptage, une mention. */
@Component({
  selector: 'oj-badge',
  styleUrl: './badge.scss',
  template: '<ng-content />',
  host: {
    class: 'oj-badge',
    '[class.oj-badge--primary]': 'tone() === "primary"',
    '[class.oj-badge--accent]': 'tone() === "accent"',
    '[class.oj-badge--success]': 'tone() === "success"',
    '[class.oj-badge--warning]': 'tone() === "warning"',
    '[class.oj-badge--danger]': 'tone() === "danger"',
  },
})
export class OjBadge {
  readonly tone = input<OjBadgeTone>('neutral');
}
