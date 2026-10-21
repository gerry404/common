import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OjinoUi } from './ojino-ui';

describe('OjinoUi', () => {
  let component: OjinoUi;
  let fixture: ComponentFixture<OjinoUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OjinoUi],
    }).compileComponents();

    fixture = TestBed.createComponent(OjinoUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
