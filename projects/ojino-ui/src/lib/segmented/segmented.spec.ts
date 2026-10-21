import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OjSegment, OjSegmented } from './segmented';

const SEGMENTS: readonly OjSegment<number>[] = [
  { value: 0, label: 'Ca va' },
  { value: 1, label: 'Un peu' },
  { value: 2, label: 'Beaucoup' },
];

describe('OjSegmented', () => {
  let fixture: ComponentFixture<OjSegmented<number>>;
  let element: HTMLElement;

  function radios(): HTMLInputElement[] {
    return Array.from(element.querySelectorAll<HTMLInputElement>('input[type=radio]'));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [OjSegmented] }).compileComponents();

    fixture = TestBed.createComponent<OjSegmented<number>>(OjSegmented);
    fixture.componentRef.setInput('segments', SEGMENTS);
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  /**
   * C'est la raison d'etre du composant : de vrais radios natifs, donc le
   * clavier et l'annonce « 2 sur 3 » viennent du navigateur.
   */
  it('rend de vrais boutons radio', () => {
    expect(radios().length).toBe(3);
  });

  it('se declare comme un groupe de radios', () => {
    expect(element.getAttribute('role')).toBe('radiogroup');
  });

  it('ne coche rien tant qu aucune valeur n est choisie', () => {
    expect(radios().some((radio) => radio.checked)).toBe(false);
  });

  it('coche le segment correspondant a la valeur', async () => {
    fixture.componentRef.setInput('value', 2);
    await fixture.whenStable();

    expect(radios()[2].checked).toBe(true);
    expect(radios()[0].checked).toBe(false);
  });

  it('remonte la valeur au clic', async () => {
    radios()[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(1);
  });

  it('accepte la valeur 0 comme un choix, pas comme une absence', async () => {
    radios()[0].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe(0);
    expect(radios()[0].checked).toBe(true);
  });

  /**
   * Deux groupes sur la meme page doivent etre independants. C'est le `name`
   * partage qui rend les options exclusives, donc il doit differer d'un
   * groupe a l'autre.
   */
  it('donne un name different a chaque groupe', async () => {
    const second = TestBed.createComponent<OjSegmented<number>>(OjSegmented);
    second.componentRef.setInput('segments', SEGMENTS);
    await second.whenStable();

    const nameOfFirst = radios()[0].name;
    const nameOfSecond = (second.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
      'input[type=radio]',
    )?.name;

    expect(nameOfFirst).toBeTruthy();
    expect(nameOfSecond).toBeTruthy();
    expect(nameOfFirst).not.toBe(nameOfSecond);
  });

  it('reporte l etiquette du groupe sur l element hote', async () => {
    fixture.componentRef.setInput('label', 'Niveau de difficulte');
    await fixture.whenStable();

    expect(element.getAttribute('aria-label')).toBe('Niveau de difficulte');
  });
});
