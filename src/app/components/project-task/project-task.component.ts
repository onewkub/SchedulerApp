import {Component, Input, OnInit} from '@angular/core';
import {Task, TaskStatus} from '../../models/task.model';
import {MatDialog} from '@angular/material';
import {ConfirmTaskStatusComponent} from '../confirm-task-status/confirm-task-status.component';
import {UserService} from '../../services/user.service';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public userService: UserService,
              public projectService: ProjectService) {
  }

  @Input() taskList: Task[];

  ngOnInit() {
    this.calculateStatus();
  }

  getStatusName(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.completed:
        return 'Completed';
      case TaskStatus.canceled:
        return 'Canceled';
      case TaskStatus.pending:
        return 'Pending';
      case TaskStatus.late:
        return 'Late';
      case TaskStatus.inProgress:
        return 'In Progress';
    }
  }

  getStatusColor(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.completed:
        return '#0091ea';
      case TaskStatus.canceled:
        return '#78909c';
      case TaskStatus.inProgress:
        return '#76ff03';
      case TaskStatus.pending:
        return '#ff9800';
      case TaskStatus.late:
        return '#ef5350';
    }
  }

  calculateStatus(): void {
    const toDay = new Date();
    this.taskList.forEach(task => {
      if (task.status !== TaskStatus.canceled && task.status !== TaskStatus.completed) {
        if (task.startDate > toDay) {
          task.status = TaskStatus.pending;
        } else if (task.startDate <= toDay && task.endDate < toDay) {
          task.status = TaskStatus.late;
        } else {
          task.status = TaskStatus.inProgress;
        }
      }
    });
  }

  enableDoneButton(task: Task): boolean {
    return (task.status === TaskStatus.inProgress || task.status === TaskStatus.late) && this.isTaskOrProjectOwner(task);
  }

  enableUploadButton(task: Task): boolean {
    return this.enableDoneButton(task) && this.isTaskOrProjectOwner(task);
  }

  enableCancelButton(task: Task): boolean {
    return task.status !== TaskStatus.canceled && task.status !== TaskStatus.completed && this.isTaskOrProjectOwner(task);
  }

  openDoneConfirmDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmTaskStatusComponent, {
      width: '30em'
    });
    dialogRef.componentInstance.title = 'Mark as done';
    dialogRef.componentInstance.desc = 'Are you sure you want to mark this task as done?';
    dialogRef.componentInstance.task = task;
    dialogRef.componentInstance.toStatus = TaskStatus.completed;
  }

  openCancelConfirmDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmTaskStatusComponent, {
      width: '30em'
    });
    dialogRef.componentInstance.title = 'Mark as canceled';
    dialogRef.componentInstance.desc = 'Are you sure you want to mark this task as canceled?';
    dialogRef.componentInstance.task = task;
    dialogRef.componentInstance.toStatus = TaskStatus.canceled;
  }

  getTaskOwnerName(task: Task): string {
    return this.userService.getUser(task.owner).displayName;
  }

  isTaskOrProjectOwner(task: Task): boolean {
    const currentUserID = this.userService.currentUser.uid;
    const project = this.projectService.getProject(task.projectID);
    const isProjectOwner = project.projectOwner === currentUserID;
    return currentUserID === task.owner || isProjectOwner;
  }
}
