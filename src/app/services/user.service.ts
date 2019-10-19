import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : any;
  constructor(
    public db: AngularFirestore,
    private authService : AuthService
  ) {
    this.user = authService.user;
  }
  
}
