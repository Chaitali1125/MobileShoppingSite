import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMobileComponent } from './remove-mobile.component';

describe('RemoveMobileComponent', () => {
  let component: RemoveMobileComponent;
  let fixture: ComponentFixture<RemoveMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
