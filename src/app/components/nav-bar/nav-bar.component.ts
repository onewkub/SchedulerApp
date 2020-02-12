import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

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
  displayNanme: string;
  selectedProjectID: number;
  activePage = PageType.dashboard;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.displayNanme = user.displayName;
      }
    );
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  getProjectList(): Project[] {
    // return this.projectService.getUserProjects(this.userService.getCurrentUserID());
    return null;
  }

  openDialog() {
    this.dialog.open(AddProjectComponent, {
      width: '45em'
    });
  }

  isSelectedProject(project: Project): boolean {
    return false;
    // return this.selectedProjectID === project.uid && this.activePage === PageType.project;
  }

  isSelectedDashboard(): boolean {
    return this.activePage === PageType.dashboard;
  }

  switchToProject(project: Project) {
    // this.router.navigate([`/app/projects/${project.uid}`]).then(() => {
    //   this.activePage = PageType.project;
    //   this.selectedProjectID = project.uid;
    // });
  }

  switchToDashboard() {
    this.router.navigate(['/app']).then(() => {
      this.activePage = PageType.dashboard;
    });
  }
}
