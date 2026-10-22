import { moduleMetadata } from '@storybook/angular-vite';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OjButton } from './button';
import { OjIcon } from '../icon/icon';
import { OjSpinner } from '../spinner/spinner';

type ButtonArgs = OjButton & { label: string };

/**
 * `ojButton` est une directive, pas un composant : elle se pose sur un
 * `<button>` ou un `<a>` natif.
 *
 * Donc `type="submit"`, `disabled`, `routerLink`, le clavier et le menu
 * contextuel du navigateur fonctionnent sans qu'on les reimplemente, et aucun
 * element enveloppant ne vient casser une grille.
 */
const meta: Meta<ButtonArgs> = {
  title: 'Actions/Bouton',
  decorators: [moduleMetadata({ imports: [OjButton, OjIcon, OjSpinner] })],
  argTypes: {
    ojButton: {
      name: 'appearance',
      description: "Le niveau d'emphase. Vide vaut `filled`.",
      control: 'inline-radio',
      options: ['filled', 'outlined', 'ghost', 'soft', 'danger'],
    },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
    icon: { control: 'boolean', description: 'Carre, pour une icone seule.' },
    block: { control: 'boolean', description: 'Pleine largeur.' },
    loading: {
      control: 'boolean',
      description: 'Pose `aria-busy` sans desactiver le bouton.',
    },
    label: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<ButtonArgs>;

export const BacASable: Story = {
  name: 'Bac a sable',
  args: {
    ojButton: 'filled',
    size: 'md',
    icon: false,
    block: false,
    loading: false,
    label: 'Commencer gratuitement',
  },
  render: (args) => ({
    props: args,
    template: `
      <button
        [ojButton]="ojButton"
        [size]="size"
        [icon]="icon"
        [block]="block"
        [loading]="loading"
        type="button">
        {{ label }}
      </button>
    `,
  }),
};

/** Cinq niveaux, pas six : au-dela, personne ne sait plus quelle est l'action principale. */
export const Apparences: Story = {
  render: () => ({
    template: `
      <div class="sb-row">
        <button ojButton type="button">filled</button>
        <button ojButton="outlined" type="button">outlined</button>
        <button ojButton="ghost" type="button">ghost</button>
        <button ojButton="soft" type="button">soft</button>
        <button ojButton="danger" type="button">danger</button>
      </div>
    `,
  }),
};

export const Tailles: Story = {
  render: () => ({
    template: `
      <div class="sb-row">
        <button ojButton type="button">Taille normale</button>
        <button ojButton size="sm" type="button">Petite</button>
      </div>
    `,
  }),
};

/** L'icone double le texte, elle ne le remplace pas. */
export const AvecIcone: Story = {
  name: 'Avec une icone',
  render: () => ({
    template: `
      <div class="sb-row">
        <button ojButton type="button">
          Continuer
          <oj-icon name="arrow_forward" />
        </button>
        <button ojButton="outlined" type="button">
          <oj-icon name="download" />
          Telecharger
        </button>
      </div>
    `,
  }),
};

/** Un glyphe n'est pas un nom accessible : l'`aria-label` est obligatoire. */
export const IconeSeule: Story = {
  name: 'Icone seule',
  render: () => ({
    template: `
      <div class="sb-row">
        <button ojButton="ghost" icon type="button" aria-label="Fermer">
          <oj-icon name="close" />
        </button>
        <button ojButton="outlined" icon type="button" aria-label="Modifier">
          <oj-icon name="edit" />
        </button>
        <button ojButton="ghost" icon size="sm" type="button" aria-label="Supprimer">
          <oj-icon name="delete" size="sm" />
        </button>
      </div>
    `,
  }),
};

export const Desactive: Story = {
  render: () => ({
    template: `
      <div class="sb-row">
        <button ojButton type="button" disabled>Plein</button>
        <button ojButton="outlined" type="button" disabled>Contour</button>
        <button ojButton="danger" type="button" disabled>Destructif</button>
      </div>
    `,
  }),
};

/**
 * `loading` pose `aria-busy` et ne desactive pas.
 *
 * Un bouton desactive perd le focus, et l'utilisateur au clavier se retrouve
 * nulle part.
 */
export const Occupe: Story = {
  render: () => ({
    template: `
      <button ojButton type="button" loading>
        <oj-spinner size="sm" />
        Enregistrement…
      </button>
    `,
  }),
};

export const PleineLargeur: Story = {
  name: 'Pleine largeur',
  render: () => ({
    template: `
      <div style="display:grid;gap:.5rem;max-width:22rem">
        <button ojButton block type="button">Creer mon compte</button>
        <button ojButton="outlined" block type="button">Annuler</button>
      </div>
    `,
  }),
};

/** Meme apparence, mais c'est une navigation : clic-milieu et menu contextuel marchent. */
export const SurUnLien: Story = {
  name: 'Sur un lien',
  render: () => ({
    template: `
      <div class="sb-row">
        <a ojButton href="#">Un lien plein</a>
        <a ojButton="outlined" href="#">Un lien contour</a>
      </div>
    `,
  }),
};
