import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  acount: any;
  constructor(
    public authService: AuthService
  ) {
    this.acount = {
      name: authService.user.name
    }
  }
  ngOnInit() { }
  isExpanded = false;
  checkAccount(){
    console.log(this.authService.user);
  }

  toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
  }
}
