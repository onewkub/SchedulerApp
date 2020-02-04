import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-confirm-task-done',
  templateUrl: './confirm-task-status.component.html',
  styleUrls: ['./confirm-task-status.component.css']
})
export class ConfirmTaskStatusComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ConfirmTaskStatusComponent>) { }

  title: string;
  desc: string;
  task: Task;
  toStatus: TaskStatus;

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.task.status = this.toStatus;
    this.dialogRef.close();
  }
}
