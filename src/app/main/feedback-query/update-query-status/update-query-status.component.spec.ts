import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQueryStatusComponent } from './update-query-status.component';

describe('UpdateQueryStatusComponent', () => {
  let component: UpdateQueryStatusComponent;
  let fixture: ComponentFixture<UpdateQueryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQueryStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQueryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
