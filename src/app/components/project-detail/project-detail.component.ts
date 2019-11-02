import {Component, OnInit, Input} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/models/project.model';
import { MatDialog } from "@angular/material";
import { EditDetailDIalogComponent } from '../edit-detail-dialog/edit-detail-dialog.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project : Project; 
  @Input() projectDescription: any;
  constructor(
    public userService: UserService,
    public dialog: MatDialog
  ) {
    
  }

  ngOnInit() {

  }
  openDialog(){
    console.log("openDialog");
    console.log('Open Dialog');
    const dialogRef = this.dialog.open(EditDetailDIalogComponent, {
      width: '50rem',
      data : this.projectDescription
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
