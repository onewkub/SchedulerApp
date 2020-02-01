import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';

enum PageType {
  dashboard,
  project,
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isExpanded = false;
  selectedProjectID: number = null;
  activePage = PageType.dashboard;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.doLogout();
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  getUserDisplayName(): string {
    return this.userService.getCurrentUser().displayName;
  }

  getProjectList(): Project[] {
    return this.projectService.getUserProjects(this.userService.getCurrentUserID());
  }

  openDialog() {
    this.dialog.open(AddProjectComponent, {
      width: '45em'
    });
  }

  isSelectedProject(project: Project): boolean {
    return this.selectedProjectID === project.projectID && this.activePage === PageType.project;
  }

  isSelectedDashboard(): boolean {
    return this.activePage === PageType.dashboard;
  }

  switchToProject(project: Project): void {
    this.router.navigate([`/app/projects/${project.projectID}`]).then(() => {
      this.activePage = PageType.project;
      this.selectedProjectID = project.projectID;
    });
  }

  switchToDashboard(): void {
    this.router.navigate(['/app']).then(() => {
      this.activePage = PageType.dashboard;
    });
  }
}
