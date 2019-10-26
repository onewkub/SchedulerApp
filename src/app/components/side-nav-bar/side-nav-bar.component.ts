import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {User} from 'src/app/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import {AddProjectComponent} from '../add-project/add-project.component';
import {AccessService} from 'src/app/services/access.service';
import {Project} from '../../models/project.model';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  isExpanded = false;
  account: User = null;
  projectList = this.accessService.projectList;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public accessService: AccessService,
  ) {
    this.account = authService.currentUser;
  }

  ngOnInit() {

  }

  logOut() {
    this.account = null;
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
    return project === this.accessService.selectedProject;
  }

  switchProject(project: Project): void {
    this.accessService.selectedProject = project;
  }
}
