import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountDetailInfoComponent } from './bank-account-detail-info.component';

describe('BankAccountDetailInfoComponent', () => {
  let component: BankAccountDetailInfoComponent;
  let fixture: ComponentFixture<BankAccountDetailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountDetailInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
