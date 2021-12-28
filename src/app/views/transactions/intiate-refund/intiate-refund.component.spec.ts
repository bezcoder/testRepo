import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntiateRefundComponent } from './intiate-refund.component';

describe('IntiateRefundComponent', () => {
  let component: IntiateRefundComponent;
  let fixture: ComponentFixture<IntiateRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntiateRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntiateRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
