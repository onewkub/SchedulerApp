import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  lastedUid: number;
  constructor(
    public userService: UserService,
    public apiService: ApiService,
    public router: Router
  ) {
    

    this.lastedUid = this.apiService.authTable.length;
  }

  doRegister(value): boolean {
    console.log("Registing Hahaah");
    var emailBeUsed = this.apiService.users.find(function (element) {
      return element.email == value.email;
    });

    if (!emailBeUsed) {
      this.apiService.authTable.push({uid: this.lastedUid, email: value.email, password: value.password, logedIn: false});
      this.apiService.users.push({
        uid: this.lastedUid,
        displayName: value.displayName,
        email: value.email,
      });
      this.apiService.userData.push({uid: this.lastedUid, projectID: []});
      alert("Your registation succesful.");
      return true;
    }
    alert("Your registation not succesful.");
    this.lastedUid++;
    // console.log(this.authTable);
    return false;
  }
  doLogin(value): boolean {
    var validate = this.apiService.authTable.find(function (element) {
      if(element.email === value.email && element.password === value.password)
        return element;
      return null;
    });
    if (validate != null) {
      this.userService.currentUser = this.apiService.users.find(function(element){
        if(element.uid == validate.uid) return element;
        return null;
      });
      console.log(this.userService.currentUser.displayName);
      this.router.navigate(['/app']);
      return true;
    }
    return false;
  }

  doLogout(): void {
    this.router.navigate(['/']).then(() => console.log('Logout'));
  }
}
