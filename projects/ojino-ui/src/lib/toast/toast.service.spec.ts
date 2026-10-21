import { TestBed } from '@angular/core/testing';

import { OjToastService } from './toast.service';

describe('OjToastService', () => {
  let toasts: OjToastService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    toasts = TestBed.inject(OjToastService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('demarre vide', () => {
    expect(toasts.toasts().length).toBe(0);
  });

  it('empile dans l ordre d arrivee', () => {
    toasts.info('un');
    toasts.success('deux');

    expect(toasts.toasts().map((toast) => toast.message)).toEqual(['un', 'deux']);
  });

  it('retient le ton de chaque message', () => {
    toasts.error('ca a casse');

    expect(toasts.toasts()[0].tone).toBe('error');
  });

  /** Trois messages simultanes sont deja beaucoup, dix seraient illisibles. */
  it('ne garde que les trois derniers', () => {
    toasts.info('un');
    toasts.info('deux');
    toasts.info('trois');
    toasts.info('quatre');

    expect(toasts.toasts().map((toast) => toast.message)).toEqual(['deux', 'trois', 'quatre']);
  });

  it('retire un message a la main', () => {
    toasts.info('un');
    const id = toasts.toasts()[0].id;

    toasts.dismiss(id);

    expect(toasts.toasts().length).toBe(0);
  });

  it('retire un message tout seul apres son delai', () => {
    toasts.success('enregistre');

    vi.advanceTimersByTime(3999);
    expect(toasts.toasts().length).toBe(1);

    vi.advanceTimersByTime(1);
    expect(toasts.toasts().length).toBe(0);
  });

  /** Une erreur demande parfois d'etre relue : elle reste plus longtemps. */
  it('laisse une erreur plus longtemps qu un succes', () => {
    toasts.error('injoignable');

    vi.advanceTimersByTime(4000);
    expect(toasts.toasts().length).toBe(1);

    vi.advanceTimersByTime(3000);
    expect(toasts.toasts().length).toBe(0);
  });

  it('vide tout d un coup', () => {
    toasts.info('un');
    toasts.error('deux');

    toasts.clear();

    expect(toasts.toasts().length).toBe(0);
  });

  it('attribue un identifiant distinct a chaque message', () => {
    toasts.info('un');
    toasts.info('deux');

    const [first, second] = toasts.toasts();
    expect(first.id).not.toBe(second.id);
  });
});
