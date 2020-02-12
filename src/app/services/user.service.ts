import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  setUserData(user: User): Promise<void> {
    const ref = this.firestore.doc<User>(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return ref.set(data, { merge: true });
  }

  getUser(uid: string): Observable<User> {
    return this.firestore.doc<User>(`users/${uid}`).valueChanges();
  }

  getCurrentUser(): Observable<User> {
    const uid = this.authService.getCurrentUserUID();
    return this.getUser(uid);
  }

  getUsers(): User[] {
    // return this.dataService.users;
    return null;
  }

  getUserTask(userID: number): Task[] {
    // return this.dataService.taskList.filter((task) => task.ownerID === userID);
    return null;
  }
}
