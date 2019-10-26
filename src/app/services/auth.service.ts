import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users: User[];
  currentUser: User;
  lastedUid: number;
  authTable: { uid: number; email: string; password: string; logedIn: boolean }[];

  constructor(
    public router: Router
  ) {
    this.users = [
      {
        uid: 1,
        displayName: 'Wachira Norasing',
        email: 'oldnew123@gmail.com'
      },
      {
        uid: 2,
        displayName: 'Tapanapong Chuntama',
        email: 'Livenze2397@gmail.com'
      },
      {
        uid: 3,
        displayName: 'Nattakit Hosapsin',
        email: 'relta@chifumi.net'
      }
    ];
    this.authTable = [
      {uid: 1, email: 'oldnew123@gmail.com', password: 'onewkub123', logedIn: false},
      {uid: 2, email: 'Livenze2397@gmail.com', password: '12345678', logedIn: false},
      {uid: 3, email: 'relta@chifumi.net', password: '2oDydeJVPZs2zRsW', logedIn: false},
    ];
    this.lastedUid = this.users.length;
    console.log(this.currentUser);
  }

  doRegister(value): boolean {
    console.log(value);
    const emailBeUsed = this.users.find(user => user.email === value.email);

    if (!emailBeUsed) {
      this.authTable.push({uid: this.lastedUid, email: value.email, password: value.password, logedIn: false});
      this.users.push({
        uid: this.lastedUid,
        displayName: value.displayName,
        email: value.email,
      });
      alert('Your registration successful.');
      return true;
    }
    alert('Your registration not successful.');
    this.lastedUid++;
    // console.log(this.authTable);
    return false;
  }

  doLogin(input): boolean {
    const validate = this.authTable.find(user => {
      if (user.email === input.email && user.password === input.password) {
        return user;
      }
      return null;
    });
    if (validate != null) {
      this.currentUser = this.users.find(user => {
        if (user.uid === validate.uid) {
          return user;
        }
      });
      this.router.navigate(['/app']).then(() => console.log('Log-in with : ' + this.currentUser.email));
      return true;
    }
    return false;
  }

  doLogout(): void {
    this.router.navigate(['/']).then(() => console.log('Logout'));
  }

}
