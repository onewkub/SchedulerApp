import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth
    ) { }

  register(displayName: string, email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fireauth.auth.createUserWithEmailAndPassword(email, password).then(
        res => {
          this.updateAuthDisplayName(res.user, displayName);
          resolve();
        }
      ).catch(
        err => {
          reject('User registration error: ' + err.message);
        }
      );
    });
  }

  logIn(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fireauth.auth.signInWithEmailAndPassword(email, password).then(
        res => {
          resolve();
        }
      ).catch(
        err => {
          reject(err);
        }
      );
    });
  }

  isLoggedIn(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      this.fireauth.auth.onAuthStateChanged(
        user => {
          if (user) {
            resolve(user);
          } else {
            reject('');
          }
        },
        err => reject(err)
      );
    });
  }

  updateAuthDisplayName(user: firebase.User, displayName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fireauth.auth.currentUser.updateProfile({ displayName }).then(
        () => {
          resolve();
        }
      ).catch(
        err => {
          console.error(err);
          reject();
        }
      );
    });
  }

  getCurrentUserUID(): string {
    return this.fireauth.auth.currentUser.uid;
  }

  logOut(): Promise<void> {
    return this.fireauth.auth.signOut();
  }
}
