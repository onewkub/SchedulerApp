import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AngularFireAuth } from "@angular/fire/auth";
// import { AuthService } from '../services/auth.service';
// import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    // public afAuth: AngularFireAuth,
    // public authService: AuthService,
    private router: Router,
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // if(firebase.auth().currentUser == null){
      //   console.log("access Denied");
      //   this.router.navigate(['/']);
      //   return false;
      // }
      return true;

  }
}
