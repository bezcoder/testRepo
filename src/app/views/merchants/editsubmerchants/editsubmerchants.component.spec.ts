import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubmerchantsComponent } from './editsubmerchants.component';

describe('EditsubmerchantsComponent', () => {
  let component: EditsubmerchantsComponent;
  let fixture: ComponentFixture<EditsubmerchantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsubmerchantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsubmerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
