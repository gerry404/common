import { moduleMetadata } from '@storybook/angular-vite';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OjIcon } from './icon';

/**
 * Le glyphe vient d'une police a ligatures. La famille est un jeton
 * (`--font-icons`), donc remplacable sans toucher a un seul composant.
 *
 * Toujours `aria-hidden` : une icone double un texte, elle ne le remplace
 * jamais. Quand elle est seule, c'est au bouton qui la contient de porter
 * l'`aria-label`.
 */
const meta: Meta<OjIcon> = {
  title: 'Fondations/Icone',
  component: OjIcon,
  decorators: [moduleMetadata({ imports: [OjIcon] })],
  argTypes: {
    name: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;

type Story = StoryObj<OjIcon>;

export const BacASable: Story = {
  name: 'Bac a sable',
  args: { name: 'school', size: 'md' },
};

export const Tailles: Story = {
  render: () => ({
    template: `
      <div class="sb-row">
        <oj-icon name="school" size="sm" />
        <oj-icon name="school" />
        <oj-icon name="school" size="lg" />
        <oj-icon name="school" size="xl" />
      </div>
    `,
  }),
};

export const CellesQuOnUtilise: Story = {
  name: 'Celles qu on utilise',
  render: () => ({
    props: {
      names: [
        'school',
        'child_care',
        'backpack',
        'science',
        'functions',
        'account_balance',
        'auto_awesome',
        'event_available',
        'arrow_forward',
        'chevron_right',
        'close',
        'check_circle',
        'error',
        'info',
        'visibility',
        'visibility_off',
        'delete',
        'edit',
        'add',
        'menu',
        'download',
        'task_alt',
      ],
    },
    template: `
      <div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(7rem,1fr))">
        @for (name of names; track name) {
          <div style="display:grid;gap:.375rem;justify-items:center;text-align:center">
            <oj-icon [name]="name" size="lg" />
            <code style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--color-text-muted)">{{ name }}</code>
          </div>
        }
      </div>
    `,
  }),
};
