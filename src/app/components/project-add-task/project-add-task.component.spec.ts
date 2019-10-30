import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddTaskComponent } from './project-add-task.component';

describe('ProjectAddTaskComponent', () => {
  let component: ProjectAddTaskComponent;
  let fixture: ComponentFixture<ProjectAddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAddTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
