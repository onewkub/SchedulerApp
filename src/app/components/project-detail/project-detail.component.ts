import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { EditDetailDIalogComponent } from '../edit-detail-dialog/edit-detail-dialog.component';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: Project;
  user: User;

  constructor(
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentProject();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      user => this.user = user
    );
  }

  getCurrentProject() {
    this.activeRoute.params.subscribe(params => {
      this.projectService.getProject(params.uid).subscribe(
        project => this.project = project
      );
    });
  }

  isOwnedByCurrentUser(): boolean {
    return this.user?.uid === this.project?.manager;
  }

  openDialog() {
    this.dialog.open(EditDetailDIalogComponent, {
      width: '50rem',
      data: this.project
    });
  }
}
