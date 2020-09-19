import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CBResultComponent } from './cbresult.component';

describe('CBResultComponent', () => {
  let component: CBResultComponent;
  let fixture: ComponentFixture<CBResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CBResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CBResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
