import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : Observable<any>;
  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private authService : AuthService
  ) {
    this.user = authService.user;
  }
  
}
