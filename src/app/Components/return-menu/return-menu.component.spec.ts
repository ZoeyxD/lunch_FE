import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnMenuComponent } from './return-menu.component';

describe('ReturnMenuComponent', () => {
  let component: ReturnMenuComponent;
  let fixture: ComponentFixture<ReturnMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnMenuComponent]
    });
    fixture = TestBed.createComponent(ReturnMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
