# common

Le socle partage d'Ojino : la bibliotheque d'interface, et l'atelier qui la montre.

```
projects/ojino-ui    la bibliotheque publiable — jetons et composants
projects/workshop    l'atelier — notre catalogue de composants
```

## Pourquoi pas Storybook

Storybook ne supporte pas Angular 22 : ses `peerDependencies` s'arretent a
`@angular/cli < 22.0.0`, et des bugs ouverts concernent specifiquement
Angular 22.2. L'installer demanderait `--legacy-peer-deps` et un pari sur une
chaine d'outils tierce.

L'atelier est donc une application Angular ordinaire. Elle utilise la meme
version, le meme compilateur et les memes jetons que la bibliotheque : elle ne
peut pas montrer autre chose que ce que les applications verront.

## Demarrer

```bash
npm install
npm run watch:ui      # recompile la bibliotheque a chaque sauvegarde
npm start             # ouvre l'atelier sur http://localhost:4300
```

Les deux en parallele, dans deux terminaux. L'atelier consomme
`dist/ojino-ui`, donc la bibliotheque doit etre compilee au moins une fois
avant le premier demarrage.

## Tester

```bash
npm test              # la bibliotheque
npm run test:workshop # l'atelier
```

## Ce que contient la bibliotheque

| Nom | Forme | Remplace |
|---|---|---|
| `ojButton` | directive | `matButton` |
| `ojControl` | directive | `matInput`, `mat-select` |
| `oj-field` | composant | `mat-form-field` |
| `oj-icon` | composant | `mat-icon` |
| `oj-card` | composant | `mat-card` |
| `oj-segmented` | composant | `mat-button-toggle-group` |
| `oj-progress` | composant | `mat-progress-bar` |
| `oj-spinner` | composant | `mat-spinner` |
| `oj-badge` | composant | — |
| `OjToastService` + `oj-toast-host` | service + composant | `MatSnackBar` |

Le selecteur de date de Material est remplace par `<input type="date">` : le
widget du systeme, gratuit, accessible, et natif sur mobile.

### Boutons et champs sont des directives, pas des composants

Elles se posent sur un `<button>`, un `<a>`, un `<input>`, un `<select>`
natif. Le clavier, `type="submit"`, `disabled`, `routerLink`, l'autofill du
navigateur et les claviers adaptes sur mobile continuent de fonctionner sans
qu'on les reimplemente — et aucun element enveloppant ne vient casser une
grille.

Les composants sont reserves a ce qui possede vraiment du balisage : un champ
avec son etiquette et son erreur, une carte, une barre de progression.

## Consommer la bibliotheque

Les styles, en une ligne dans le `styles.scss` de l'application :

```scss
@use 'ojino-ui/styles' as *;
```

avec, dans `angular.json` :

```json
"stylePreprocessorOptions": { "includePaths": ["dist", "node_modules"] }
```

L'application doit charger elle-meme les polices — `Inter` et
`Material Symbols Outlined`. La bibliotheque ne telecharge rien d'elle-meme,
et la famille d'icones est un jeton (`--font-icons`), donc remplacable.

## Les jetons

Tout passe par `projects/ojino-ui/src/styles/_tokens.scss`. Aucune couleur,
aucun espacement, aucune taille ne s'ecrit en dur dans un composant.

Les echelles brutes sont nommees par leur matiere — `sage`, `clay`, `sand` —
et les composants ne citent **que** les jetons semantiques :
`--color-primary`, `--color-text-muted`, `--space-4`. Un composant qui nomme
`--sage-400` est un bug : la couleur de marque pourrait changer de famille
sans que l'echelle mente.

Le theme sombre ne redefinit que les jetons semantiques, par
`prefers-color-scheme` et par `data-theme` sur la racine — l'attribut gagne
dans les deux sens, ce qui rend un interrupteur possible. L'atelier en a un :
un design system jamais regarde en sombre est un design system a moitie teste.
