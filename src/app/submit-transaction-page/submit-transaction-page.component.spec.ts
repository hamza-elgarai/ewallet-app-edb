import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTransactionPageComponent } from './submit-transaction-page.component';

describe('SubmitTransactionPageComponent', () => {
  let component: SubmitTransactionPageComponent;
  let fixture: ComponentFixture<SubmitTransactionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitTransactionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitTransactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
