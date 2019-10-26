import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  projectList: Project[] = [];
  selectedProject: Project;

  constructor(
    public authService: AuthService
  ) {
    this.projectList = [
      {
        name: 'Project A',
        startDate: new Date( 2019, 4, 6),
        endDate: new Date( 2020, 5, 29),
        owner: 1,
        members: [2, 3]
      },
      {
        name: 'Project B',
        startDate: new Date(2019, 8, 15),
        endDate: new Date(2020, 8, 15),
        owner: 3,
        members: []
      }
    ];
    this.selectedProject = this.projectList[0];
  }

  addProject(form): void {
    const newProject: Project = new Project();
    newProject.name = form.projectName;
    newProject.startDate = form.startDate;
    newProject.endDate = form.endDate;
    newProject.owner = this.authService.currentUser.uid;
    newProject.members = [];
    form.memberArray.forEach(user => newProject.members.push(user.member.uid));
    this.projectList.push(newProject);
  }

  getAllUsers(): User[] {
    return this.authService.users;
  }
}
