import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTermComponent } from './school-term.component';

describe('SchoolTermComponent', () => {
  let component: SchoolTermComponent;
  let fixture: ComponentFixture<SchoolTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
