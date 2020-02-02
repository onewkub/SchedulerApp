import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MockDataService } from './mock-data.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  lastedUid: number;

  constructor(
    private apiService: MockDataService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.lastedUid = this.apiService.authTable.length;
  }

  doRegister(displayName: string, email: string, password: string): boolean {
    const isEmailUseable = this.apiService.users.find(user => user.email === email);

    if (!isEmailUseable) {
      this.apiService.authTable.push({ uid: this.lastedUid, email, password, logedIn: false });
      this.apiService.users.push({
        uid: this.lastedUid++,
        displayName,
        email
      });

      alert('Your registration successful.');
      return true;
    }
    alert('Your registration not successful.');
    return false;
  }

  // Quick and dirty login using plain text cokkie
  doLogin(email: string, password: string): boolean {
    const login = this.apiService.authTable.find(user =>
      user.email === email && user.password === password);

    if (login === undefined) {
      return false;
    }

    this.cookieService.set('login', login.uid.toString(), 30);
    this.router.navigate(['app/dashboard']);
    return true;
  }

  isAlreadyLogin(): boolean {
    return this.cookieService.get('login') !== '';
  }

  doLogout() {
    this.cookieService.delete('login');
    this.router.navigate(['']);
  }
}
