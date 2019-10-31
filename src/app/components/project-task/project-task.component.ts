import {Component, Input, OnInit} from '@angular/core';
import {Task, TaskStatus} from '../../models/task.model';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {

  constructor() {
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
    return task.status === TaskStatus.inProgress || task.status === TaskStatus.late;
  }

  enableUploadButton(task: Task): boolean {
    return this.enableDoneButton(task);
  }

  enableCancelButton(task: Task): boolean {
    return task.status !== TaskStatus.canceled && task.status !== TaskStatus.completed;
  }
}
