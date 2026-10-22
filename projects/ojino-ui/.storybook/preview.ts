import type { Preview } from '@storybook/angular-vite';

// Les jetons et la remise a zero de la bibliotheque, exactement comme les
// chargerait une application. C'est ce qui garantit que ce qu'on voit ici est
// ce qu'on verra la-bas.
import '../src/styles/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // Les violations remontent dans l'onglet de test sans faire echouer
      // la CI tant qu'on n'a pas traite l'existant.
      test: 'todo',
    },

    options: {
      // L'ordre de lecture : les jetons d'abord, parce que tout le reste les
      // cite, puis les briques, puis les retours.
      storySort: {
        order: [
          'Fondations',
          ['Jetons'],
          'Actions',
          'Formulaires',
          'Surfaces',
          'Retours',
        ],
      },
    },
  },

  // Le theme sombre se bascule depuis la barre d'outils. Un design system
  // jamais regarde en sombre est un design system a moitie teste.
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Clair' },
          { value: 'dark', title: 'Sombre' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },

  decorators: [
    (story, context) => {
      // `data-theme` sur la racine du document, le meme attribut que celui
      // qu'une application poserait.
      document.documentElement.setAttribute('data-theme', context.globals['theme'] as string);
      return story();
    },
  ],
};

export default preview;
