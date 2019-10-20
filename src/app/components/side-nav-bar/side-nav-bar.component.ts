import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  isExpanded = false;
  account: User;

  constructor(
    public authService: AuthService,
    public userSevice: UserService,
    public dialog: MatDialog
  ) {
    
    this.account = this.userSevice.getCurentUserData();
    
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
    this.account = this.userSevice.getCurentUserData();

  }
  openDialog(): void {
    console.log("Open Dialog");
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '50em'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
