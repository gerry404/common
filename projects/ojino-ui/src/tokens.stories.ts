import type { Meta, StoryObj } from '@storybook/angular-vite';

/**
 * Les jetons de design.
 *
 * Aucune couleur, aucun espacement, aucune taille ne s'ecrit en dur dans un
 * composant. Tout vient de `src/styles/_tokens.scss`, et change la.
 *
 * Les echelles brutes sont nommees par leur matiere — `sage`, `clay`, `sand` —
 * et les composants ne citent **que** les jetons semantiques :
 * `--color-primary`, `--color-text-muted`, `--space-4`. Un composant qui nomme
 * `--sage-400` est un bug : la couleur de marque pourrait changer de famille
 * sans que l'echelle mente.
 *
 * Bascule le theme dans la barre d'outils. Les echelles brutes ne bougent pas,
 * seuls les jetons semantiques changent de role.
 */
const meta: Meta = {
  title: 'Fondations/Jetons',
};

export default meta;

type Story = StoryObj;

const SEMANTIC = [
  '--color-primary',
  '--color-primary-hover',
  '--color-primary-soft',
  '--color-accent',
  '--color-accent-soft',
  '--color-success',
  '--color-warning',
  '--color-danger',
  '--color-danger-soft',
  '--color-bg',
  '--color-surface',
  '--color-surface-sunken',
  '--color-border',
  '--color-border-strong',
  '--color-text',
  '--color-text-muted',
  '--color-text-subtle',
];

function ramp(family: string, steps: readonly number[]): string[] {
  return steps.map((step) => `--${family}-${step}`);
}

/** Les seuls jetons qu'un composant a le droit de citer. */
export const Semantiques: Story = {
  render: () => ({
    props: { tokens: SEMANTIC },
    template: `
      <div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(9rem,1fr))">
        @for (token of tokens; track token) {
          <div style="display:grid;gap:.5rem">
            <span
              [style.background]="'var(' + token + ')'"
              style="display:block;block-size:3rem;border:1px solid var(--color-border);border-radius:var(--radius-md)"></span>
            <code style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--color-text-muted)">{{ token }}</code>
          </div>
        }
      </div>
    `,
  }),
};

/** Le vert sauge est la couleur de marque. Seme sur #8FAF9A. */
export const VertSauge: Story = {
  name: 'Vert sauge',
  render: () => ({
    props: { tokens: ramp('sage', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) },
    template: `
      <div class="sb-row">
        @for (token of tokens; track token) {
          <div style="display:grid;gap:.25rem;justify-items:center">
            <span
              [style.background]="'var(' + token + ')'"
              style="display:block;inline-size:3rem;block-size:2.5rem;border:1px solid var(--color-border);border-radius:var(--radius-sm)"></span>
            <code style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--color-text-muted)">{{ token.split('-').pop() }}</code>
          </div>
        }
      </div>
    `,
  }),
};

/** La terre cuite sert les accents, jamais une action principale. */
export const TerreCuite: Story = {
  name: 'Terre cuite',
  render: () => ({
    props: { tokens: ramp('clay', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]) },
    template: `
      <div class="sb-row">
        @for (token of tokens; track token) {
          <div style="display:grid;gap:.25rem;justify-items:center">
            <span
              [style.background]="'var(' + token + ')'"
              style="display:block;inline-size:3rem;block-size:2.5rem;border:1px solid var(--color-border);border-radius:var(--radius-sm)"></span>
            <code style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--color-text-muted)">{{ token.split('-').pop() }}</code>
          </div>
        }
      </div>
    `,
  }),
};

/** Les neutres sont chauds : un gris froid jurerait avec le vert sauge. */
export const NeutresChauds: Story = {
  name: 'Neutres chauds',
  render: () => ({
    props: { tokens: ramp('sand', [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) },
    template: `
      <div class="sb-row">
        @for (token of tokens; track token) {
          <div style="display:grid;gap:.25rem;justify-items:center">
            <span
              [style.background]="'var(' + token + ')'"
              style="display:block;inline-size:3rem;block-size:2.5rem;border:1px solid var(--color-border);border-radius:var(--radius-sm)"></span>
            <code style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--color-text-muted)">{{ token.split('-').pop() }}</code>
          </div>
        }
      </div>
    `,
  }),
};

/** Echelle de 4px. Aucune valeur intermediaire. */
export const Espacement: Story = {
  render: () => ({
    props: { tokens: [1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((n) => `--space-${n}`) },
    template: `
      <div style="display:grid;gap:.5rem">
        @for (token of tokens; track token) {
          <div style="display:grid;gap:.5rem;grid-template-columns:7rem 1fr;align-items:center">
            <code style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--color-text-muted)">{{ token }}</code>
            <span
              [style.inline-size]="'var(' + token + ')'"
              style="display:block;block-size:1rem;background:var(--color-primary);border-radius:var(--radius-sm)"></span>
          </div>
        }
      </div>
    `,
  }),
};

export const Rayons: Story = {
  render: () => ({
    props: { tokens: ['sm', 'md', 'lg', 'xl'].map((n) => `--radius-${n}`) },
    template: `
      <div class="sb-row">
        @for (token of tokens; track token) {
          <div style="display:grid;gap:.5rem;justify-items:center">
            <span
              [style.border-radius]="'var(' + token + ')'"
              style="display:block;inline-size:4rem;block-size:4rem;background:var(--color-primary-soft);border:1px solid var(--color-border-strong)"></span>
            <code style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--color-text-muted)">{{ token }}</code>
          </div>
        }
      </div>
    `,
  }),
};

/** Fluide en `clamp()` a partir de `--text-xl` : pas de palier de rupture. */
export const Typographie: Story = {
  render: () => ({
    props: {
      tokens: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].map(
        (n) => `--text-${n}`,
      ),
    },
    template: `
      <div style="display:grid;gap:.75rem">
        @for (token of tokens; track token) {
          <div style="display:grid;gap:.5rem;grid-template-columns:7rem 1fr;align-items:center">
            <code style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--color-text-muted)">{{ token }}</code>
            <p [style.font-size]="'var(' + token + ')'">Des revisions plus simples</p>
          </div>
        }
      </div>
    `,
  }),
};

export const Elevation: Story = {
  render: () => ({
    props: { tokens: ['--shadow-1', '--shadow-2', '--shadow-3'] },
    template: `
      <div class="sb-row" style="gap:2rem;padding:1rem">
        @for (token of tokens; track token) {
          <div style="display:grid;gap:.75rem;justify-items:center">
            <span
              [style.box-shadow]="'var(' + token + ')'"
              style="display:block;inline-size:6rem;block-size:4rem;background:var(--color-surface);border-radius:var(--radius-lg)"></span>
            <code style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--color-text-muted)">{{ token }}</code>
          </div>
        }
      </div>
    `,
  }),
};
