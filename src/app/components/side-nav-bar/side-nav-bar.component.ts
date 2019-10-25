import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AccessService } from 'src/app/services/access.service';
import { Project } from 'src/app/models/project.model';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  isExpanded = false;
  account: User;
  project: DocumentReference[];
  constructor(
    public authService: AuthService,
    public userService: UserService,
    public dialog: MatDialog,
    public accessService: AccessService,
  ) {

    this.account = this.userService.getCurrentUserData();
    // console.log(this.userSevice.getAllProeject());

  }
  ngOnInit() {

  }
    checkAccount() {
    console.log(this.account.name);
  }

  logOut(){
    this.authService.doLogout();
  }
  toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
    this.account = this.userService.getCurrentUserData();

  }
  openDialog(): void {
    console.log("Open Dialog");
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '45em'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
