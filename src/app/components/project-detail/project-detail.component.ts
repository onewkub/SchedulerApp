import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { MatDialog } from '@angular/material';
import { EditDetailDIalogComponent } from '../edit-detail-dialog/edit-detail-dialog.component';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  @Input() project: Project;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  isOwnedByCurrentUser(): boolean {
    return this.projectService.isOwnedByCurrentUser(this.project.projectID);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditDetailDIalogComponent, {
      width: '50rem',
      data: this.project.projectID
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
