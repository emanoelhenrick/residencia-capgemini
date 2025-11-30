import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accomodations } from './accomodations';

describe('Accomodations', () => {
  let component: Accomodations;
  let fixture: ComponentFixture<Accomodations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accomodations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accomodations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
