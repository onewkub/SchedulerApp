import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AddProjectComponent} from '../add-project/add-project.component';
import {UserService} from 'src/app/services/user.service';
import {ProjectService} from 'src/app/services/project.service';
import {Project} from '../../models/project.model';
import {Router} from '@angular/router';
import {PageType, SessionService} from '../../services/session.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  isExpanded = false;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public router: Router,
    public userService: UserService,
    public session: SessionService,
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
    return this.session.selectedProjectID === project.projectID && this.session.activePage === PageType.project;
  }

  isSelectedDashboard(): boolean {
    return this.session.activePage === PageType.dashboard;
  }

  switchToProject(project: Project): void {
    console.log(project.projectID);
    this.router.navigate([`/projects/${project.projectID}`]).then(() => {
      this.isExpanded = false;
      this.session.activePage = PageType.project;
      this.session.selectedProjectID = project.projectID;
    });
  }

  switchToDashboard(): void {
    this.router.navigate(['/dashboard']).then(() => {
      this.session.activePage = PageType.dashboard;
    });
  }
}
