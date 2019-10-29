import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = {
    uid: 0,
    displayName: 'Test Account',
    email: 'test@scheduler.com'
  };
  userProject: Project[];

  constructor(public apiService : ApiService) {
  }

  getUser(uid: number): User{
    return this.apiService.users.find(element => { return element.uid == uid});
  }
  getDate(date: Date){
    var months = ['Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  }
}
