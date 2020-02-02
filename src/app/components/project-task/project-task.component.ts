import {Component, Input, OnInit} from '@angular/core';
import {Task, TaskStatus} from '../../models/task.model';
import {MatDialog} from '@angular/material';
import {ConfirmTaskStatusComponent} from '../confirm-task-status/confirm-task-status.component';
import {UserService} from '../../services/user.service';
import {ProjectService} from '../../services/project.service';
import {ConfirmTaskCancelComponent} from '../comfirm-task-cancel/confirm-task-cancel.component';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {

  @Input() taskList: Task[];

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.updateTaskStatus();
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

  enableDoneButton(task: Task): boolean {
    return (task.status === TaskStatus.inProgress || task.status === TaskStatus.late) && this.isTaskOrProjectOwner(task);
  }

  enableUploadButton(task: Task): boolean {
    return this.enableDoneButton(task);
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
    const dialogRef = this.dialog.open(ConfirmTaskCancelComponent, {
      width: '30em'
    });
    dialogRef.componentInstance.title = 'Mark as canceled';
    dialogRef.componentInstance.desc = 'Are you sure you want to mark this task as canceled?';
    dialogRef.componentInstance.task = task;
    dialogRef.componentInstance.toStatus = TaskStatus.canceled;
  }

  getOwnerDisplayName(task: Task): string {
    return this.userService.getUserDisplayName(task.ownerID);
  }

  isTaskOwner(task: Task): boolean {
    return this.userService.getCurrentUserID() === task.ownerID;
  }

  isTaskOrProjectOwner(task: Task): boolean {
    const currentUserID = this.userService.getCurrentUserID();
    const project = this.projectService.getProject(task.projectID);
    const isProjectOwner = project.projectOwnerID === currentUserID;
    return this.isTaskOwner(task) || isProjectOwner;
  }

  getRemainingTimeString(task: Task): string {
    const lessThanDay = 'less then a';
    const timeDiff = this.getRemainingTime(task);
    const timeDiffString = timeDiff < 1 ? lessThanDay : timeDiff.toString();
    const dayString = timeDiff > 1 ? 'days' : 'day';
    switch (task.status) {
      case TaskStatus.pending:
        return timeDiffString + ' ' + dayString + ' until start';
      case TaskStatus.inProgress:
        return timeDiffString + ' ' + dayString + ' remains';
      case TaskStatus.late:
        return timeDiffString + ' ' + dayString + ' late';
      default:
        return '';
    }
  }

  getRemainingTime(task: Task): number {
    const currentDay = new Date();
    switch (task.status) {
      case TaskStatus.pending:
        return this.getDiffDays(task.startDate, currentDay);
      case TaskStatus.inProgress:
        return this.getDiffDays(task.endDate, currentDay);
      case TaskStatus.late:
        return this.getDiffDays(currentDay, task.endDate);
      default:
        return 0;
    }
  }

  getDiffDays(dateA: Date, dateB: Date): number {
    const diff = dateA.getTime() - dateB.getTime();
    return Math.floor(diff / (1000 * 3600 * 24));
  }

  getReasonForCancel(task: Task): string {
    if (task.reasonForCancel === '' || task.reasonForCancel === null || task.reasonForCancel === undefined) {
      return '';
    } else {
      return 'Canceled because : ' + task.reasonForCancel;
    }
  }
}
