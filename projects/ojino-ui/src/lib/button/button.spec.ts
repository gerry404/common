import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { OjButton } from './button';

@Component({
  imports: [OjButton],
  template: `
    <button ojButton type="button" id="defaut">Defaut</button>
    <button ojButton="outlined" type="button" id="contour">Contour</button>
    <button ojButton="danger" size="sm" block type="button" id="danger">Danger</button>
    <button ojButton="ghost" icon type="button" id="icone" aria-label="Fermer">x</button>
    <button ojButton type="button" id="occupe" loading>Occupe</button>
    <a ojButton="soft" href="#" id="lien">Lien</a>
  `,
})
class Host {}

describe('OjButton', () => {
  let element: HTMLElement;

  function at(id: string): HTMLElement {
    const found = element.querySelector<HTMLElement>(`#${id}`);
    if (!found) {
      throw new Error(`Element #${id} absent du gabarit de test.`);
    }
    return found;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('retombe sur filled quand aucune apparence n est donnee', () => {
    expect(at('defaut').classList).toContain('oj-button');
    expect(at('defaut').classList).toContain('oj-button--filled');
  });

  it('lit l apparence directement dans le selecteur', () => {
    expect(at('contour').classList).toContain('oj-button--outlined');
    expect(at('contour').classList).not.toContain('oj-button--filled');
  });

  it('cumule taille et pleine largeur', () => {
    const danger = at('danger');
    expect(danger.classList).toContain('oj-button--danger');
    expect(danger.classList).toContain('oj-button--sm');
    expect(danger.classList).toContain('oj-button--block');
  });

  it('marque le cas de l icone seule', () => {
    expect(at('icone').classList).toContain('oj-button--icon');
  });

  /**
   * Le point important : `loading` annonce l'attente sans desactiver. Un
   * bouton desactive perd le focus, et l'utilisateur au clavier se retrouve
   * nulle part.
   */
  it('annonce l attente sans desactiver le bouton', () => {
    const occupe = at('occupe') as HTMLButtonElement;
    expect(occupe.getAttribute('aria-busy')).toBe('true');
    expect(occupe.disabled).toBe(false);
  });

  it('n ajoute aucun attribut aria-busy au repos', () => {
    expect(at('defaut').hasAttribute('aria-busy')).toBe(false);
  });

  it('s applique aussi a un lien', () => {
    const lien = at('lien');
    expect(lien.tagName).toBe('A');
    expect(lien.classList).toContain('oj-button--soft');
  });
});
