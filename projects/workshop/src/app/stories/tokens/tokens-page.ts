import { Component } from '@angular/core';

import { Story } from '../../shared/story/story';

interface Swatch {
  readonly token: string;
  readonly label: string;
}

@Component({
  imports: [Story],
  selector: 'wk-tokens-page',
  styleUrl: './tokens-page.scss',
  templateUrl: './tokens-page.html',
})
export class TokensPage {
  protected readonly semantic: readonly Swatch[] = [
    { token: '--color-primary', label: 'primary' },
    { token: '--color-primary-soft', label: 'primary-soft' },
    { token: '--color-accent', label: 'accent' },
    { token: '--color-accent-soft', label: 'accent-soft' },
    { token: '--color-success', label: 'success' },
    { token: '--color-warning', label: 'warning' },
    { token: '--color-danger', label: 'danger' },
    { token: '--color-surface', label: 'surface' },
    { token: '--color-surface-sunken', label: 'surface-sunken' },
    { token: '--color-border', label: 'border' },
    { token: '--color-text', label: 'text' },
    { token: '--color-text-muted', label: 'text-muted' },
  ];

  protected readonly sage = this.scale('sage', [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ]);

  protected readonly clay = this.scale('clay', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]);

  protected readonly sand = this.scale('sand', [
    0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ]);

  protected readonly spacing: readonly Swatch[] = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map(
    (step) => ({ token: `--space-${step}`, label: `space-${step}` }),
  );

  protected readonly radii: readonly Swatch[] = ['sm', 'md', 'lg', 'xl'].map((name) => ({
    token: `--radius-${name}`,
    label: `radius-${name}`,
  }));

  protected readonly sizes: readonly Swatch[] = [
    'xs',
    'sm',
    'base',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
  ].map((name) => ({ token: `--text-${name}`, label: `text-${name}` }));

  private scale(family: string, steps: readonly number[]): readonly Swatch[] {
    return steps.map((step) => ({ token: `--${family}-${step}`, label: `${step}` }));
  }
}
