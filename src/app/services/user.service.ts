import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any = null;
  constructor(
    public db: AngularFirestore,
    private authService: AuthService
  ) {
    this.user = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log("Current user: " + user.email);
        // router.navigate(['/app']);
        // return user;
        this.user = user;
        // console.log(this.user.displayName);
      }
      else {
        console.log("No user Loging in");
      }
    });
  }
  getCurentUserData(): User {
    return {
      uid: this.user.uid,
      name: this.user.displayName

    }
  }
}
