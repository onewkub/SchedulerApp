import { Component, Inject ,OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-project-add-task',
  templateUrl: './project-add-task.component.html',
  styleUrls: ['./project-add-task.component.css']
})
export class ProjectAddTaskComponent implements OnInit {

  addTaskForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProjectAddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public formBuilder: FormBuilder,
  ) 
  { 
    this.addTaskForm = this.formBuilder.group(
      {
        name: [data.name],
        description: [data.description],
        startDate: [data.startDate],
        endDate: [data.endDate]
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
