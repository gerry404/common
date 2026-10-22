import { Component, inject } from '@angular/core';
import { moduleMetadata } from '@storybook/angular-vite';
import type { Meta, StoryObj } from '@storybook/angular-vite';

import { OjToastHost } from './toast-host';
import { OjToastService } from './toast.service';
import { OjButton } from '../button/button';
import { OjIcon } from '../icon/icon';

/**
 * Le service detient la liste, un seul `oj-toast-host` l'affiche. Les
 * composants appellent `error()` sans savoir ou le message apparaitra ni
 * combien de temps il restera.
 *
 * Une erreur reste sept secondes quand un succes en reste quatre : une erreur
 * demande parfois d'etre relue.
 *
 * Au-dela de trois messages simultanes, les plus anciens sont jetes — clique
 * vite pour le voir.
 */
@Component({
  imports: [OjButton, OjIcon, OjToastHost],
  selector: 'sb-toast-demo',
  template: `
    <div class="sb-row">
      <button ojButton="outlined" type="button" (click)="toasts.info('Ton brouillon est enregistre.')">
        <oj-icon name="info" />
        Information
      </button>
      <button ojButton="outlined" type="button" (click)="toasts.success('Profil mis a jour.')">
        <oj-icon name="check_circle" />
        Succes
      </button>
      <button
        ojButton="outlined"
        type="button"
        (click)="toasts.error('Le serveur est injoignable. Verifie ta connexion.')">
        <oj-icon name="error" />
        Erreur
      </button>
    </div>

    <oj-toast-host />
  `,
})
class ToastDemo {
  protected readonly toasts = inject(OjToastService);
}

const meta: Meta<ToastDemo> = {
  title: 'Retours/Messages ephemeres',
  component: ToastDemo,
  decorators: [moduleMetadata({ imports: [ToastDemo] })],
};

export default meta;

type Story = StoryObj<ToastDemo>;

export const Declencheurs: Story = {};
