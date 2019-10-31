import { Component, Inject ,OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-project-add-task',
  templateUrl: './project-add-task.component.html',
  styleUrls: ['./project-add-task.component.css']
})
export class ProjectAddTaskComponent implements OnInit {

  addTaskForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProjectAddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {work: Task, owner: User},
    public formBuilder: FormBuilder,
  ) 
  { 
    this.addTaskForm = this.formBuilder.group(
      {
        name: [data.work.name],
        description: [data.work.description],
        startDate: [data.work.startDate],
        endDate: [data.work.endDate]
      }
    );
  }


  ngOnInit() {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    console.log(this.addTaskForm.value);
  }

}
