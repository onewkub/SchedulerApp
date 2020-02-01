import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MockDataService } from './mock-data.service';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private dataService: MockDataService,
    private cookieService: CookieService
  ) { }

  getCurrentUser(): User {
    return this.getUser(Number(this.cookieService.get('login')));
  }

  getCurrentUserID(): number {
    return this.getCurrentUser().uid;
  }

  getUser(userID: number): User {
    return this.dataService.users.find(user => {
      return user.uid === userID;
    });
  }

  getUserDisplayName(userID: number): string {
    return this.getUser(userID).displayName;
  }

  getUsers(): User[] {
    return this.dataService.users;
  }

  getUserTask(userID: number): Task[] {
    return this.dataService.taskList.filter((task) => task.ownerID === userID);
  }
}
