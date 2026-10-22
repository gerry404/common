import { FormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular-vite';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OjField } from './field';
import { OjButton } from '../button/button';
import { OjControl } from '../control/control';
import { OjIcon } from '../icon/icon';

/**
 * `oj-field` entoure, `ojControl` habille.
 *
 * Le champ reste un element natif : l'autofill du navigateur, les claviers
 * adaptes sur mobile et les selecteurs de date du systeme arrivent
 * gratuitement. Reimplementer une liste deroulante accessible coute des
 * centaines de lignes et se trompe presque toujours sur le clavier.
 */
const meta: Meta<OjField> = {
  title: 'Formulaires/Champ',
  component: OjField,
  decorators: [moduleMetadata({ imports: [FormsModule, OjButton, OjControl, OjIcon] })],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    for: { control: 'text', description: "L'id du champ projete." },
  },
};

export default meta;

type Story = StoryObj<OjField>;

export const BacASable: Story = {
  name: 'Bac a sable',
  args: {
    label: 'Adresse email',
    hint: "On ne l'utilise que pour te connecter.",
    error: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <oj-field [label]="label" [hint]="hint" [error]="error" style="max-width:24rem">
        <input ojControl type="email" [invalid]="!!error" />
      </oj-field>
    `,
  }),
};

/**
 * L'erreur remplace l'aide au lieu de s'empiler dessous : empiler les deux
 * fait lire deux fois la meme chose, et c'est l'erreur qui compte.
 *
 * `aria-invalid` plutot que `:invalid` — la pseudo-classe native s'allume des
 * la premiere frappe, avant que l'utilisateur ait fini d'ecrire.
 */
export const EnErreur: Story = {
  name: 'En erreur',
  render: () => ({
    template: `
      <oj-field
        label="Adresse email"
        hint="Cette aide ne s'affiche plus."
        error="Cet email est deja pris."
        style="max-width:24rem">
        <input ojControl type="email" value="awa@ojino.app" invalid />
      </oj-field>
    `,
  }),
};

export const Desactive: Story = {
  render: () => ({
    template: `
      <oj-field label="Identifiant" hint="Attribue a la creation du compte." style="max-width:24rem">
        <input ojControl value="OJ-48213" disabled />
      </oj-field>
    `,
  }),
};

export const ZoneDeTexte: Story = {
  name: 'Zone de texte',
  render: () => ({
    template: `
      <oj-field label="Quelque chose a preciser ?" hint="Facultatif" style="max-width:24rem">
        <textarea ojControl rows="3"></textarea>
      </oj-field>
    `,
  }),
};

/** Un `select` natif stylise : moins spectaculaire, nettement plus correct. */
export const ListeDeroulante: Story = {
  name: 'Liste deroulante',
  render: () => ({
    template: `
      <oj-field label="Jour" style="max-width:24rem">
        <select ojControl>
          <option value="MONDAY">Lundi</option>
          <option value="TUESDAY">Mardi</option>
          <option value="WEDNESDAY" selected>Mercredi</option>
          <option value="THURSDAY">Jeudi</option>
          <option value="FRIDAY">Vendredi</option>
        </select>
      </oj-field>
    `,
  }),
};

/**
 * Le widget du systeme, pas un calendrier reecrit. Sur mobile, c'est le
 * selecteur natif qui s'ouvre.
 */
export const DateEtHeure: Story = {
  name: 'Date et heure',
  render: () => ({
    template: `
      <div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,10rem),1fr));max-width:34rem">
        <oj-field label="Date de naissance">
          <input ojControl type="date" max="2026-10-22" />
        </oj-field>
        <oj-field label="De">
          <input ojControl type="time" value="17:00" />
        </oj-field>
        <oj-field label="A">
          <input ojControl type="time" value="19:00" />
        </oj-field>
      </div>
    `,
  }),
};

/** Le bouton est pose a cote du champ, pas dedans : rien ne recouvre le texte saisi. */
export const AvecUneAction: Story = {
  name: 'Avec une action',
  render: () => ({
    template: `
      <oj-field label="Mot de passe" style="max-width:24rem">
        <div style="display:flex;gap:.5rem;align-items:center">
          <input ojControl type="password" value="motdepasse" autocomplete="current-password" />
          <button
            ojButton="outlined"
            icon
            type="button"
            aria-label="Afficher le mot de passe"
            style="flex:none">
            <oj-icon name="visibility" size="sm" />
          </button>
        </div>
      </oj-field>
    `,
  }),
};
