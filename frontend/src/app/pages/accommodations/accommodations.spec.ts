import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accommodations } from './accommodations';

describe('Accomodations', () => {
  let component: Accommodations;
  let fixture: ComponentFixture<Accommodations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accommodations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accommodations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
