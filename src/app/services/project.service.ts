import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {UserService} from './user.service';
import {Project} from '../models/project.model';
import {Task} from '../models/task.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  lastProjectID: number;

  constructor(
    public apiService: ApiService,
    public userService: UserService
  ) {
    this.lastProjectID = apiService.project.length;
  }

  addProject(input) {
    const projectTemp: Project = {
      projectID: this.lastProjectID,
      projectName: input.projectName,
      startDate: input.startDate,
      endDate: input.endDate,
      projectOwner: this.userService.currentUser.uid,
      members: []
    };

    input.memberArray.forEach(element => {
      projectTemp.members.push(element.member.uid);
    });

    console.log(input.members);
    projectTemp.members.forEach(element => {
      this.apiService.userData[element].projectID.push(this.lastProjectID);
    });

    this.apiService.userData[this.userService.currentUser.uid].projectID.push(this.lastProjectID);

    this.apiService.project.push(projectTemp);
    this.lastProjectID++;
    this.getUserProject(this.userService.currentUser.uid);
  }

  getUserProject(uid) {
    const userProjectID = this.apiService.userData.find(element => element.uid === uid).projectID;
    const userProject = [];
    userProjectID.forEach(element => {
      const temp = this.apiService.project.find(project => (project.projectID === element));
      userProject.push(temp);
    });
    this.userService.userProject = userProject;
  }

  getProject(pid): Project {
    return this.apiService.project.find(element => (element.projectID === pid));
  }

  getTasks(projectID): Task[] {
    return this.apiService.taskList.filter(task => (task.projectID === projectID));
  }

  getMember(pid): User[] {
    const result: User[] = [];
    const projectMember = this.getProject(pid).members;
    projectMember.forEach(element => {
      result.push(this.userService.getUser(element));
    });
    return result;
  }
}
