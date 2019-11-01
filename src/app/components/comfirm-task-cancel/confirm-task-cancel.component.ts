import { Component, OnInit } from '@angular/core';
import {Task, TaskStatus} from '../../models/task.model';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-confirm-task-cancel',
  templateUrl: './confirm-task-cancel.component.html',
  styleUrls: ['./confirm-task-cancel.component.css']
})
export class ConfirmTaskCancelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmTaskCancelComponent>) { }

  title: string;
  desc: string;
  task: Task;
  toStatus: TaskStatus;
  reason = new FormControl('');

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.task.status = this.toStatus;
    this.task.reasonForCancel = this.reason.value;
    this.dialogRef.close();
  }
}
