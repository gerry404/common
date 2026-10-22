import { moduleMetadata } from '@storybook/angular-vite';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OjCard } from './card';
import { OjBadge } from '../badge/badge';
import { OjButton } from '../button/button';
import { OjIcon } from '../icon/icon';

/**
 * Une surface.
 *
 * Pas d'en-tete ni de pied imposes : les trois quarts des cartes du produit
 * n'en ont pas, et celles qui en ont les composent elles-memes. Un composant
 * qui impose sa structure finit toujours contourne.
 */
const meta: Meta<OjCard> = {
  title: 'Surfaces/Carte',
  component: OjCard,
  decorators: [moduleMetadata({ imports: [OjBadge, OjButton, OjIcon] })],
  argTypes: {
    flat: { control: 'boolean', description: 'Sans ombre.' },
    interactive: { control: 'boolean', description: 'Reagit au survol.' },
  },
};

export default meta;

type Story = StoryObj<OjCard>;

export const BacASable: Story = {
  name: 'Bac a sable',
  args: { flat: false, interactive: false },
  render: (args) => ({
    props: args,
    template: `
      <oj-card [flat]="flat" [interactive]="interactive" style="max-width:22rem">
        <h3 style="font-size:var(--text-base)">Mathematiques</h3>
        <p style="margin-block-start:var(--space-1);font-size:var(--text-sm);color:var(--color-text-muted)">
          Douze chapitres, trois en retard.
        </p>
      </oj-card>
    `,
  }),
};

/** Sans ombre : pour une carte posee sur un fond deja distinct. */
export const Plate: Story = {
  args: { flat: true },
  render: (args) => ({
    props: args,
    template: `
      <oj-card [flat]="flat" style="max-width:22rem">
        <h3 style="font-size:var(--text-base)">Physique</h3>
        <p style="margin-block-start:var(--space-1);font-size:var(--text-sm);color:var(--color-text-muted)">
          A jour.
        </p>
      </oj-card>
    `,
  }),
};

/** A reserver aux cartes qui menent reellement quelque part. */
export const Cliquable: Story = {
  args: { interactive: true },
  render: (args) => ({
    props: args,
    template: `
      <oj-card [interactive]="interactive" style="max-width:26rem">
        <div style="display:flex;align-items:center;gap:1rem">
          <oj-icon name="functions" size="lg" style="color:var(--color-primary)" />
          <div style="margin-inline-end:auto">
            <h3 style="font-size:var(--text-base)">Suites numeriques</h3>
            <p style="margin-block-start:var(--space-1);font-size:var(--text-sm);color:var(--color-text-muted)">
              Chapitre 4 — a reviser avant vendredi
            </p>
          </div>
          <oj-icon name="chevron_right" />
        </div>
      </oj-card>
    `,
  }),
};

/** Etiquettes, actions : la carte ne sait rien de tout cela, elle ne fait qu'entourer. */
export const Composee: Story = {
  render: () => ({
    template: `
      <oj-card style="max-width:26rem">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:.75rem">
          <h3 style="font-size:var(--text-base)">Devoir surveille</h3>
          <oj-badge tone="warning">Dans 2 jours</oj-badge>
        </div>
        <p style="margin-block-start:var(--space-1);font-size:var(--text-sm);color:var(--color-text-muted)">
          Chapitres 3 et 4, calculatrice autorisee.
        </p>
        <div style="display:flex;gap:.5rem;margin-block-start:1rem">
          <button ojButton size="sm" type="button">Reviser</button>
          <button ojButton="ghost" size="sm" type="button">Plus tard</button>
        </div>
      </oj-card>
    `,
  }),
};

/** Les cartes s'etirent a la meme hauteur sans qu'on la fixe. */
export const EnGrille: Story = {
  name: 'En grille',
  render: () => ({
    template: `
      <div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,12rem),1fr))">
        <oj-card>
          <h3 style="font-size:var(--text-base)">College</h3>
          <p style="margin-block-start:var(--space-1);font-size:var(--text-sm);color:var(--color-text-muted)">
            Tronc commun, BEPC.
          </p>
        </oj-card>
        <oj-card>
          <h3 style="font-size:var(--text-base)">Lycee</h3>
          <p style="margin-block-start:var(--space-1);font-size:var(--text-sm);color:var(--color-text-muted)">
            Filieres, Probatoire et Baccalaureat.
          </p>
        </oj-card>
        <oj-card>
          <h3 style="font-size:var(--text-base)">Prepa</h3>
          <p style="margin-block-start:var(--space-1);font-size:var(--text-sm);color:var(--color-text-muted)">
            Programmes denses, concours.
          </p>
        </oj-card>
      </div>
    `,
  }),
};
