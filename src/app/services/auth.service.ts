import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { debug } from 'util';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
    ) {
      this.user = firebase.auth().onAuthStateChanged(function(user){
          if(user){
            console.log("Current user: " + user.email);
          }
          else{
            console.log("No user Loging in");
          }
      })
   }

  doRegister(value) {
    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
    .then(function (result) {
      const userUid = result.user.uid;
      const email = result.user.email;
      const displayName = value.displayName;

      const acoount = {
        userUID: userUid,
        email: email,
        displayName: displayName,
      }
      firebase.firestore().collection('accounts').doc(userUid).set(acoount);
      firebase.auth().signOut();
      alert("Your registation succesful.");

    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  doLogin(value) {

    return firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then(() =>{
      this.router.navigate(['/app'])
    })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });


  }
  doLogout() {
    if (firebase.auth().currentUser != null) {
      this.afAuth.auth.signOut();
    }
    else {
      console.log("Pls log in")
    }
  }
}
