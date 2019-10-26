import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = {
    uid: 0,
    displayName: 'test Account',
    email: 'test@scheduler.com'
  }
  userProject: Project[]
  constructor() {
    
  }
}
