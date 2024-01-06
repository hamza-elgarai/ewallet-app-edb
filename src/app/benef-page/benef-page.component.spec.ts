import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefPageComponent } from './benef-page.component';

describe('BenefPageComponent', () => {
  let component: BenefPageComponent;
  let fixture: ComponentFixture<BenefPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
