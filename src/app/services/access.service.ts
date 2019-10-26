import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  projectList: Project[] = [];

  constructor(
    public authService: AuthService
  ) {
    this.projectList = [
      {
        name: 'test-project-a',
        startDate: new Date( 2019, 4, 6),
        endDate: new Date( 2019, 5, 29),
        owner: 1,
        members: [2, 3]
      }
    ];
    this.projectList = [
      {
        name: 'test-project-b',
        startDate: new Date(2019, 8, 15),
        endDate: new Date(2019, 8, 15),
        owner: 3,
        members: []
      }
    ];
  }

  addProject(project: Project): void {
  }

  getAllUsers(): User[] {
    return this.authService.users;
  }
}
