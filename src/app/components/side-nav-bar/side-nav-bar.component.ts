import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AddProjectComponent} from '../add-project/add-project.component';
import {UserService} from 'src/app/services/user.service';
import {ProjectService} from 'src/app/services/project.service';

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

  // isSelectedProject(project: Project): boolean {
  //   return this.accessService.selectedProject === project;
  // }

  // isSelectedDashboard(): boolean {
  //   return this.accessService.selectedProject === null;
  // }

  // switchToProject(project: Project): void {
  //   this.accessService.selectedProject = project;
  //   this.router.navigate(['/projects']);
  // }

  // switchToDashboard(): void {
  //   this.router.navigate(['/dashboard']);
  //   this.accessService.selectedProject = null;
  // }
}
