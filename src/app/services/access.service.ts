import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(
    public userService: UserService,
    public authService: AuthService
  ) {

  }

  addProject(project: Project): void {
  }

  getAllUsers(): User[] {
    return this.authService.users;
  }
}
