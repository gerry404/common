import { moduleMetadata } from '@storybook/angular-vite';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OjSpinner } from './spinner';
import { OjButton } from '../button/button';

/**
 * Dessine en CSS et non en SVG anime : une bordure qui tourne coute une
 * propriete, et rien a telecharger. Pour une attente longue ou chiffrable,
 * `oj-progress` dit plus.
 */
const meta: Meta<OjSpinner> = {
  title: 'Retours/Attente',
  component: OjSpinner,
  decorators: [moduleMetadata({ imports: [OjSpinner, OjButton] })],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    label: { control: 'text', description: "Le nom accessible, lu par les lecteurs d'ecran." },
  },
};

export default meta;

type Story = StoryObj<OjSpinner>;

export const BacASable: Story = {
  name: 'Bac a sable',
  args: { size: 'md', label: 'Chargement' },
};

export const Tailles: Story = {
  render: () => ({
    template: `
      <div class="sb-row">
        <oj-spinner size="sm" />
        <oj-spinner />
      </div>
    `,
  }),
};

/** Dans un bouton occupe : `aria-busy` informe, le spinner montre. */
export const DansUnBouton: Story = {
  name: 'Dans un bouton',
  render: () => ({
    template: `
      <button ojButton type="button" loading>
        <oj-spinner size="sm" />
        Enregistrement…
      </button>
    `,
  }),
};
