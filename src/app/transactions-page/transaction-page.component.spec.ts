import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPageComponent } from './transaction-page.component';

describe('BenefPageComponent', () => {
  let component: TransactionPageComponent;
  let fixture: ComponentFixture<TransactionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
