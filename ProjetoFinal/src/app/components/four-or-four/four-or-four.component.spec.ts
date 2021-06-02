import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourOrFourComponent } from './four-or-four.component';

describe('FourOrFourComponent', () => {
  let component: FourOrFourComponent;
  let fixture: ComponentFixture<FourOrFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourOrFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourOrFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
