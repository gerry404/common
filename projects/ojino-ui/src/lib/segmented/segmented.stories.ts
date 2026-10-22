import { moduleMetadata } from '@storybook/angular-vite';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OjSegmented } from './segmented';

/**
 * Quelques options exclusives, toutes visibles.
 *
 * Construit sur de vrais `<input type="radio">` caches derriere leurs
 * etiquettes. Les fleches du clavier, le Tab qui saute le groupe entier et
 * l'annonce « 2 sur 4 » viennent du navigateur. Un groupe de
 * `<button role="radio">` demanderait de reimplementer les quatre, et se
 * tromperait sur au moins un.
 *
 * Essaie au clavier : Tab entre dans le groupe, les fleches changent le choix.
 */
const meta: Meta<OjSegmented<unknown>> = {
  title: 'Formulaires/Segments',
  component: OjSegmented,
  decorators: [moduleMetadata({ imports: [OjSegmented] })],
  argTypes: {
    label: { control: 'text', description: "L'etiquette du groupe, pour les lecteurs d'ecran." },
    segments: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<OjSegmented<unknown>>;

const SEVERITES = [
  { value: 0, label: 'Ca va' },
  { value: 1, label: 'Un peu' },
  { value: 2, label: 'Beaucoup' },
  { value: 3, label: 'Bloque' },
];

const CYCLES = [
  { value: 'EARLY_YEARS', label: 'Maternelle' },
  { value: 'COLLEGE', label: 'College' },
  { value: 'HIGH_SCHOOL', label: 'Lycee' },
  { value: 'PREPA', label: 'Prepa' },
  { value: 'UNIVERSITY', label: 'Universite' },
];

export const BacASable: Story = {
  name: 'Bac a sable',
  args: {
    segments: SEVERITES,
    value: 0,
    label: 'Niveau de difficulte',
  },
};

/** La valeur `0` est un choix, pas une absence de choix. C'est teste. */
export const RienDeSelectionne: Story = {
  name: 'Rien de selectionne',
  args: {
    segments: SEVERITES,
    value: null,
    label: 'Niveau de difficulte',
  },
};

/** Le groupe defile horizontalement plutot que de casser la mise en page. */
export const QuandCaDeborde: Story = {
  name: 'Quand ca deborde',
  args: {
    segments: CYCLES,
    value: 'COLLEGE',
    label: 'Cycle scolaire',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:20rem">
        <oj-segmented [segments]="segments" [value]="value" [label]="label" />
      </div>
    `,
  }),
};

/**
 * Chaque groupe recoit un `name` different.
 *
 * C'est le `name` partage qui rend les options exclusives : sans ce compteur,
 * le second groupe desactiverait le choix du premier.
 */
export const DeuxGroupes: Story = {
  name: 'Deux groupes sur une page',
  render: () => ({
    props: { segments: SEVERITES },
    template: `
      <div style="display:grid;gap:1rem;justify-items:start">
        <oj-segmented [segments]="segments" [value]="1" label="Premier groupe" />
        <oj-segmented [segments]="segments" [value]="3" label="Second groupe, independant" />
      </div>
    `,
  }),
};
