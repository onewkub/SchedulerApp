import { Component, Inject ,OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-project-add-task',
  templateUrl: './project-add-task.component.html',
  styleUrls: ['./project-add-task.component.css']
})
export class ProjectAddTaskComponent implements OnInit {

  taskForm: FormGroup;
  constructor(
    public dialog : MatDialog,
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
    // console.log(this.data);
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
    var currentDate = new Date();
    var form = this.taskForm.value;
    var progress;
    if(currentDate.getTime() < form.startDate.getTime()) progress = TaskStatus.pending
    else if(currentDate.getTime() > form.endDate.getTime()) progress = TaskStatus.late
    else progress = TaskStatus.inProgress;
    var newTask : Task = {
      taskID: null,
      projectID: this.data.work.task.projectID,
      name: form.name,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      owner: this.data.owner.uid,
      status: progress
    }
    this.projectService.addTask(newTask);
    this.onNoClick();

  }
  deleteTask(){
    // console.log(this.taskForm.value);
    // this.projectService.deleteTask(this.data.work.task.taskID);
    this.openConfirmDialog();
    // this.onNoClick();
    
  }
  openConfirmDialog(){
    console.log('Open Dialog');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30rem',

    });
    dialogRef.componentInstance.title = "Delete Task";
    dialogRef.componentInstance.desc = "Confirm to delete this task"
    dialogRef.componentInstance.taskID = this.data.work.task.taskID;
    dialogRef.componentInstance.confirm = false;

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      if(dialogRef.componentInstance.confirm){
        this.onNoClick();
      }
    });
  }

}
