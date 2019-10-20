import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
  }

  doRegister(value) {
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(function (result) {
        result.user.updateProfile({
          displayName: value.displayName
        })
        const userUid = result.user.uid;
        const email = result.user.email;
        const displayName = value.displayName;
        //result.user.displayName = value.displayName;
        // firebase.auth().currentUser.updateProfile({
        //   displayName: value.displayName
        // });
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
      .then(() => {
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
  doLoginWihtPersistent(value) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(() => {
          this.router.navigate(['/app']);
        });

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
      this.router.navigate(['/']);
    }
    else {
      console.log("No user Logged in")
    }
  }
}
