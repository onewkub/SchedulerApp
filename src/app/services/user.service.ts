import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any = null;
  project: any[];
  constructor(
  ) {
    this.user = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Current user: " + user.email);
        console.log("Current user UID: " + user.uid);
        this.user = user;
        this.getProject(user.uid);
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
  getProject(uid: string) {
    firebase.firestore().collection("users").doc(uid).get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data().project);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
}
