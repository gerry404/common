import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      // RouterLink et RouterOutlet injectent ActivatedRoute.
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('se construit', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('liste chaque page de composants dans la barre laterale', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('nav a');

    expect(links.length).toBe(6);
    expect(links[0].textContent).toContain('Jetons');
  });

  it('monte l hote des messages ephemeres une seule fois', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const hosts = (fixture.nativeElement as HTMLElement).querySelectorAll('oj-toast-host');

    expect(hosts.length).toBe(1);
  });
});
