import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  lastProjectID : number;
  constructor(
    public apiService: ApiService,
    public userService: UserService
  ) { 
    this.lastProjectID = apiService.project.length;
  }


  addProject(value){
    var projectTemp = {
      projectID: this.lastProjectID,
      projectName: value.projectName,
      startDate: value.startDate,
      endDate: value.endDate,
      projectOwner: this.userService.currentUser.uid,
      members: []
    }

    value.memberArray.forEach(element => {
      projectTemp.members.push(element.member.uid);
      // console.log(element.member);
    });
    
    console.log(value.members);
    projectTemp.members.forEach(element =>{
      this.apiService.userData[element].projectID.push(this.lastProjectID);
    });

    this.apiService.userData[this.userService.currentUser.uid].projectID.push(this.lastProjectID);

    this.apiService.project.push(projectTemp);
    this.lastProjectID++;
  }

  getUserProject(uid){
    var userProjectID = this.apiService.userData.
    find(function(element){return element.uid == uid;}).projectID;
    var userPorject = [];
    userProjectID.forEach(element =>{
      var temp = this.apiService.project.find(function(project){return (project.projectID == element);});
      userPorject.push(temp);
    });
    this.userService.userProject = userPorject;
  }
 
}
