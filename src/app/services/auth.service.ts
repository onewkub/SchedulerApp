import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User[];
  currentUser = null;
  lastedUid: number;
  authTable: { uid: number; email: string; password: string;  logedIn: boolean}[];
  constructor(
    public router: Router
  ) {
    this.user = [
      {
        uid: 1,
        displayName: 'Wachira Norasing',
        email: 'oldnew123@gmail.com'
      },
      {
        uid: 2,
        displayName: 'Tapanapong Chuntama',
        email: 'Livenze2397@gmail.com'
      }
    ];
    this.authTable = [
      {uid: 1, email: 'oldnew123@gmail.com', password: 'onewkub123',logedIn: false},
      {uid: 2, email: 'Livenze2397@gmail.com', password: '12345678', logedIn: false},


    ]
    this.lastedUid = this.user.length;
    console.log(this.currentUser);
  }

  doRegister(value): boolean {
    console.log(value);
    var emailBeUsed = this.user.find(function (element) {
      return element.email == value.email;
    })

    if (!emailBeUsed) {
      this.authTable.push({uid: this.lastedUid, email: value.email, password: value.password, logedIn: false});
      this.user.push({
        uid: this.lastedUid,
        displayName: value.displayName,
        email: value.email,
      });
      alert("Your registation succesful.")
      return true;
    }
    alert("Your registation not succesful.")
    this.lastedUid++;
    // console.log(this.authTable);
    return false;
  }
  doLogin(value): boolean {
    var validate = this.authTable.find(function (element) {
      if(element.email === value.email && element.password === value.password)
        return element;
      return null;
    });
    if (validate != null) {
      this.currentUser = this.user.find(function(element){
        if(element.uid == validate.uid) return element;
      });
      console.log(this.currentUser.displayName);
      this.router.navigate(['/app']);
      return true;
    }
    return false;
  }
  doLogout():void{
    
  }

}
