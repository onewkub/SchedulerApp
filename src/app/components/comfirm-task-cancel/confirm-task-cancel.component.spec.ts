import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTaskCancelComponent } from './confirm-task-cancel.component';

describe('ComfirmTaskCancelComponent', () => {
  let component: ConfirmTaskCancelComponent;
  let fixture: ComponentFixture<ConfirmTaskCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmTaskCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTaskCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
