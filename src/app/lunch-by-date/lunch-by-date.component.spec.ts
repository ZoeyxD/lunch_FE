import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchByDateComponent } from './lunch-by-date.component';

describe('LunchByDateComponent', () => {
  let component: LunchByDateComponent;
  let fixture: ComponentFixture<LunchByDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LunchByDateComponent]
    });
    fixture = TestBed.createComponent(LunchByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
