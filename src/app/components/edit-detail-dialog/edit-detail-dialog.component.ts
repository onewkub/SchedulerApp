import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-edit-detail-dialog',
  templateUrl: './edit-detail-dialog.component.html',
  styleUrls: ['./edit-detail-dialog.component.css']
})
export class EditDetailDIalogComponent implements OnInit {

  constructor(
    public dialogRef : MatDialogRef<EditDetailDIalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log(this.data);
  }
  onNoClick(): void{
    this.dialogRef.close();
  }
  doApply(){
    console.log("Do something");
  }
}
