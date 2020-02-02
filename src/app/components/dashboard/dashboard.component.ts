import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/models/project.model';
import { TaskStatus } from '../../models/task.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  todayDate = new Date(); // TODO: Update this with timer
  currentTasks = this.userService.getUserTask(this.userService.getCurrentUserID()).filter((task) => {
    this.projectService.updateTaskStatus();
    return task.status === TaskStatus.inProgress || task.status === TaskStatus.late;
  });

  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit() {
  }

  getUserDisplayName(): string {
    return this.userService.getCurrentUser().displayName;
  }

  getProjects(): Project[] {
    return this.projectService.getUserProjects(this.userService.getCurrentUserID());
  }

  getProjectOwnerDisplayName(projectId: number): string {
    return this.projectService.getOwner(projectId).displayName;
  }

  getRemainingDay(endDate: Date): string {
    const diff = endDate.getTime() - this.todayDate.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diff >= 0) {
      return diffDays + ' Days';
    }
    return 'Late';
  }

  getProgress(project: Project) {
    const diff = project.endDate.getTime() - project.startDate.getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const currentDate = this.todayDate.getTime() - project.startDate.getTime();
    const currentDays = Math.floor(currentDate / (1000 * 3600 * 24));
    let progress;
    if (currentDate < 0) {
      progress = 0;
    } else {
      progress = ((currentDays) / diffDays) * 100;
    }
    return progress;
  }
}
