import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { FormControl } from "@angular/forms";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-detail-dialog',
  templateUrl: './edit-detail-dialog.component.html',
  styleUrls: ['./edit-detail-dialog.component.css']
})
export class EditDetailDIalogComponent implements OnInit {

  detail : FormControl;
  constructor(
    public dialogRef : MatDialogRef<EditDetailDIalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) { 
    this.detail = new FormControl(this.data.description);
  }

  ngOnInit() {
    console.log(this.data);
  }
  onNoClick(): void{
    this.dialogRef.close();
  }
  onSave(){
    this.openConfirmDialog();
  }
  openConfirmDialog() {
    console.log('Open Dialog');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30rem',
    });
    dialogRef.componentInstance.title = 'Save Description';
    dialogRef.componentInstance.desc = 'Confirm to save this description';
    dialogRef.componentInstance.confirm = false;

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      if (dialogRef.componentInstance.confirm) {
        this.data.description = this.detail.value;
        this.onNoClick();
      }
    });
  }
}
