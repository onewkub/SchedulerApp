import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  userList: User[] = [];

  constructor(
  ) {
    firebase.firestore().collection("accounts").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        var temp: User = { uid: doc.data().userUID, name: doc.data().displayName };
        this.userList.push(temp);
        // console.log(temp);
      });
      // console.log(this.userList);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  getAllUsers(): User[] {
    return this.userList;
  }
}
