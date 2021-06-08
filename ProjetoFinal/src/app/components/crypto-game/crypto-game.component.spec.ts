import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoGameComponent } from './crypto-game.component';

describe('CryptoGameComponent', () => {
  let component: CryptoGameComponent;
  let fixture: ComponentFixture<CryptoGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
