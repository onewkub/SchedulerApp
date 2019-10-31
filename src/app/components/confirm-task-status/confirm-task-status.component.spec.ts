import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTaskStatusComponent } from './confirm-task-status.component';

describe('ConfirmTaskDoneComponent', () => {
  let component: ConfirmTaskStatusComponent;
  let fixture: ComponentFixture<ConfirmTaskStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmTaskStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTaskStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
