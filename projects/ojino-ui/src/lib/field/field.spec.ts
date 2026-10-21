import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { OjField } from './field';

@Component({
  imports: [OjField],
  template: `
    <oj-field label="Adresse email" hint="On ne l'utilise que pour te connecter.">
      <input />
    </oj-field>
  `,
})
class HostWithHint {}

@Component({
  imports: [OjField],
  template: `
    <oj-field label="Adresse email" hint="Cette aide doit disparaitre." error="Deja pris.">
      <input />
    </oj-field>
  `,
})
class HostWithError {}

@Component({
  imports: [OjField],
  template: `
    <oj-field label="Prenom" for="mon-champ">
      <input id="mon-champ" />
    </oj-field>
  `,
})
class HostWithExplicitId {}

describe('OjField', () => {
  async function render(host: unknown): Promise<HTMLElement> {
    await TestBed.configureTestingModule({
      imports: [host as never],
    }).compileComponents();
    const fixture = TestBed.createComponent(host as never);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  afterEach(() => TestBed.resetTestingModule());

  it('affiche l etiquette et l aide', async () => {
    const element = await render(HostWithHint);

    expect(element.querySelector('.oj-field__label')?.textContent).toContain('Adresse email');
    expect(element.querySelector('.oj-field__hint')?.textContent).toContain('te connecter');
  });

  /**
   * Empiler l'aide et l'erreur fait lire deux fois la meme chose. C'est
   * l'erreur qui compte.
   */
  it('remplace l aide par l erreur plutot que de les empiler', async () => {
    const element = await render(HostWithError);

    expect(element.querySelector('.oj-field__hint')).toBeNull();
    expect(element.querySelector('.oj-field__error')?.textContent).toContain('Deja pris.');
  });

  it('annonce l erreur immediatement', async () => {
    const element = await render(HostWithError);

    expect(element.querySelector('.oj-field__error')?.getAttribute('role')).toBe('alert');
  });

  it('relie l etiquette a l id fourni', async () => {
    const element = await render(HostWithExplicitId);

    expect(element.querySelector('.oj-field__label')?.getAttribute('for')).toBe('mon-champ');
  });

  it('genere un identifiant quand l appelant n en donne pas', async () => {
    const element = await render(HostWithHint);
    const label = element.querySelector('.oj-field__label');

    expect(label?.getAttribute('for')).toMatch(/^oj-field-\d+$/);
  });

  it('projette le champ tel quel', async () => {
    const element = await render(HostWithHint);

    expect(element.querySelector('.oj-field__control input')).not.toBeNull();
  });
});
