import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  desc: string;
  taskID: any;
  confirm: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    public projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
  confirmDialog() {
    this.projectService.deleteTask(this.taskID);
    this.confirm = true;
    this.closeDialog();
  }
}
