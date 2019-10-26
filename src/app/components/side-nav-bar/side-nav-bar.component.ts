import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {User} from 'src/app/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import {AddProjectComponent} from '../add-project/add-project.component';
import {AccessService} from 'src/app/services/access.service';
import {Project} from '../../models/project.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  account: User = this.authService.currentUser;
  isExpanded: boolean = this.accessService.isExpand;
  projectList: Project[] = this.accessService.projectList;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public accessService: AccessService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }

  logOut() {
    this.account = null;
    this.accessService.resetState();
    this.authService.doLogout();
  }

  toggleMenu(): void {
    this.accessService.toggleExpend();
    this.isExpanded = this.accessService.isExpand;
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
    return this.accessService.selectedProject === project;
  }

  isSelectedDashboard(): boolean {
    return this.accessService.selectedProject === null;
  }

  switchToProject(project: Project): void {
    this.accessService.selectedProject = project;
    this.router.navigate(['/projects']);
  }

  switchToDashboard(): void {
    this.router.navigate(['/dashboard']);
    this.accessService.selectedProject = null;
  }
}
