import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isExpanded = false;
  displayNanme: string;
  projectList: Project[];
  selectedProjectID: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.displayNanme = user.displayName;
        this.projectService.getUserProjects(user.uid).subscribe(
          projects => this.projectList = projects
        );
      }
    );
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  openDialog() {
    this.dialog.open(AddProjectComponent, {
      width: '45em'
    });
  }
}
