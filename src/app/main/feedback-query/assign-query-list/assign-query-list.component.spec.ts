import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignQueryListComponent } from './assign-query-list.component';

describe('AssignQueryListComponent', () => {
  let component: AssignQueryListComponent;
  let fixture: ComponentFixture<AssignQueryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignQueryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignQueryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
