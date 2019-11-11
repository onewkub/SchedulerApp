import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {ApiService} from './api.service';

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
    this.lastedUid = this.apiService.authTable.length+1;
  }

  doRegister(input): boolean {
    console.log('Registering user account');
    const emailUsable = this.apiService.users.find(user => user.email === input.email);

    if (!emailUsable) {
      this.apiService.authTable.push({uid: this.lastedUid, email: input.email, password: input.password, logedIn: false});
      this.apiService.users.push({
        uid: this.lastedUid,
        displayName: input.displayName,
        email: input.email,
      });
      this.apiService.userData.push({uid: this.lastedUid, projectID: []});
      console.log(this.apiService.users);
      console.log(this.apiService.authTable);
      alert('Your registration successful.');
      return true;
    }
    alert('Your registration not successful.');
    this.lastedUid++;
    return false;
  }

  doLogin(input): boolean {
    const validate = this.apiService.authTable.find(user => {
      if (user.email === input.email && user.password === input.password) {
        return user;
      }
      return null;
    });
    if (validate != null) {
      this.userService.currentUser = this.apiService.users.find(user => {
        if (user.uid === validate.uid) {
          return user;
        }
        return null;
      });
      console.log(this.userService.currentUser.displayName);
      this.router.navigate(['app/dashboard']);
      return true;
    }
    return false;
  }

  doLogout(): void {
    this.router.navigate(['']).then(() => console.log('Logout'));
  }
}
