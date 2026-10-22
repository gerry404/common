import { moduleMetadata } from '@storybook/angular-vite';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OjProgress } from './progress';

/**
 * Sans `value`, la barre est indeterminee : on ne sait pas combien de temps,
 * on le dit. La valeur est bornee dans le composant plutot que de faire
 * confiance a l'appelant.
 */
const meta: Meta<OjProgress> = {
  title: 'Retours/Progression',
  component: OjProgress,
  decorators: [moduleMetadata({ imports: [OjProgress] })],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Null pour une barre indeterminee.',
    },
  },
};

export default meta;

type Story = StoryObj<OjProgress>;

export const BacASable: Story = {
  name: 'Bac a sable',
  args: { value: 35 },
};

export const Indeterminee: Story = {
  args: { value: null },
};

/** Un 140 passe a 100 plutot que de deborder de la barre. */
export const ValeurHorsBornes: Story = {
  name: 'Valeur hors bornes',
  args: { value: 140 },
};

export const Etapes: Story = {
  render: () => ({
    template: `
      <div style="display:grid;gap:1rem">
        <oj-progress [value]="0" />
        <oj-progress [value]="25" />
        <oj-progress [value]="50" />
        <oj-progress [value]="75" />
        <oj-progress [value]="100" />
      </div>
    `,
  }),
};
