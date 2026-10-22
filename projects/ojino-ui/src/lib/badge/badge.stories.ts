import { moduleMetadata } from '@storybook/angular-vite';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OjBadge } from './badge';

/** Une etiquette courte : un statut, un comptage, une mention. */
const meta: Meta<OjBadge> = {
  title: 'Surfaces/Etiquette',
  component: OjBadge,
  decorators: [moduleMetadata({ imports: [OjBadge] })],
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['neutral', 'primary', 'accent', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;

type Story = StoryObj<OjBadge & { label: string }>;

export const BacASable: Story = {
  name: 'Bac a sable',
  args: { tone: 'primary', label: 'Nouveau' },
  render: (args) => ({
    props: args,
    template: '<oj-badge [tone]="tone">{{ label }}</oj-badge>',
  }),
};

export const Tons: Story = {
  render: () => ({
    template: `
      <div class="sb-row">
        <oj-badge>neutral</oj-badge>
        <oj-badge tone="primary">primary</oj-badge>
        <oj-badge tone="accent">accent</oj-badge>
        <oj-badge tone="success">success</oj-badge>
        <oj-badge tone="warning">warning</oj-badge>
        <oj-badge tone="danger">danger</oj-badge>
      </div>
    `,
  }),
};
