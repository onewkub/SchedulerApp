import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-edit-detail-dialog',
  templateUrl: './edit-detail-dialog.component.html',
  styleUrls: ['./edit-detail-dialog.component.css']
})
export class EditDetailDIalogComponent implements OnInit {

  detail: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public project: Project,
    public dialogRef: MatDialogRef<EditDetailDIalogComponent>,
    public dialog: MatDialog,
    private projectService: ProjectService
  ) {
    this.detail = new FormControl(this.project.description);
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
  onSave() {
    this.openConfirmDialog();
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30rem',
    });
    dialogRef.componentInstance.title = 'Save Description';
    dialogRef.componentInstance.desc = 'Confirm to save this description';
    dialogRef.componentInstance.confirm = false;

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.confirm) {
        this.project.description = this.detail.value;
        this.projectService.updateProject({uid: this.project.uid, description: this.detail.value});
        this.onClose();
      }
    });
  }
}
