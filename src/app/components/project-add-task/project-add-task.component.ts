import { Component, Inject ,OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { ProjectComponent } from '../project/project.component';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectTableComponent } from '../project-table/project-table.component';


@Component({
  selector: 'app-project-add-task',
  templateUrl: './project-add-task.component.html',
  styleUrls: ['./project-add-task.component.css']
})
export class ProjectAddTaskComponent implements OnInit {

  taskForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProjectAddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {work: any, owner: User},
    public formBuilder: FormBuilder,
    public projectService: ProjectService,
  ) 
  { 
    this.taskForm = this.formBuilder.group(
      {
        name: [data.work.task.name],
        description: [data.work.task.description],
        startDate: [data.work.task.startDate],
        endDate: [data.work.task.endDate]
      }
    );
  }


  ngOnInit() {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  editTask(){
    console.log(this.taskForm.value);
    var form = this.taskForm.value;
    this.data.work.task.name = form.name;
    this.data.work.task.startDate = form.startDate;
    this.data.work.task.endDate = form.endDate;
    this.data.work.task.description = form.description;
    this.onNoClick();

  }

  addTask(){
    console.log(this.taskForm.value);
    var form = this.taskForm.value;
    var newTask : Task = {
      taskID: null,
      projectID: this.data.work.task.projectID,
      name: form.name,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      owner: this.data.owner.uid,
      status: TaskStatus.pending
    }
    this.projectService.addTask(newTask);
    this.onNoClick();

  }
  deleteTask(){
    console.log(this.taskForm.value);
    this.projectService.deleteTask(this.data.work.task.taskID);
    this.onNoClick();
    
  }

}
