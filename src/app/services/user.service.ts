import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.userCollection = this.firestore.collection<User>('users');
    this.users = this.userCollection.valueChanges();
  }

  getUser(uid: string): Observable<User> {
    return this.firestore.doc<User>(`users/${uid}`).valueChanges();
  }

  getCurrentUser(): Observable<User> {
    const uid = this.authService.getCurrentUserUID();
    return this.getUser(uid);
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  updateUser(user: firebase.User): Promise<void> {
    const ref = this.firestore.doc<User>(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return ref.set(data, { merge: true });
  }
}
