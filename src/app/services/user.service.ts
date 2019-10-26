import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as firebase from 'firebase/app';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any = null;
  project: Project[];
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
  getCurrentUserData(): User {
    return {
      uid: this.user.uid,
      name: this.user.displayName

    }
  }
  getAllProeject(){
    // return this.project;
  }
  getProject(uid: string) {
    firebase.firestore().collection("users").doc(uid).get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Docment data:", doc.data().project);
        // this.project = doc.data().project;
        doc.data().project.forEach(element => {
            element.get().then(function(doc) {
              if (doc.exists) {
                  console.log(doc.data());
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

}
