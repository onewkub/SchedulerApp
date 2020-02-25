import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/models/project.model';
import { TaskStatus } from '../../models/task.model';
import { ProjectService } from '../../services/project.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  user: User;
  todayDate = new Date();
  currentTasks = null;

  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      user => this.user = user
    );
  }

  getUserDisplayName(): string {
    return null;
  }

  getProjects(): Project[] {
    return null;
  }

  getProjectOwnerDisplayName(projectID: string): string {
    return null;
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
    const diff = project.endDate.toDate().getTime() - project.startDate.toDate().getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const currentDate = this.todayDate.getTime() - project.startDate.toDate().getTime();
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
