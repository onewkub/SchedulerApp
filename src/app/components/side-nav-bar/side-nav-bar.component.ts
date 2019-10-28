import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AddProjectComponent} from '../add-project/add-project.component';
import {UserService} from 'src/app/services/user.service';
import {ProjectService} from 'src/app/services/project.service';
import {Project} from '../../models/project.model';
import {Router} from '@angular/router';

enum PageType {
  dashboard,
  project,
}

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  isExpanded = false;
  selectedProjectID: number = null;
  activePage = PageType.dashboard;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public router: Router,
    public userService: UserService,
    public projectService: ProjectService
  ) {
    projectService.getUserProject(userService.currentUser.uid);
    console.log('Account: ' + this.userService.currentUser.displayName);
  }

  ngOnInit() {
  }

  logOut() {
    console.log('Logout');
    this.authService.doLogout();
  }

  toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
  }

  openDialog(): void {
    console.log('Open Dialog');
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '45em'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
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
    this.router.navigate(['/app/dashboard']).then(() => {
      this.activePage = PageType.dashboard;
    });
  }
}

