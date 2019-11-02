import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/project.model';
import {FormControl} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user.model';
import {UserItem} from '../add-project/add-project.component';
import {ApiService} from '../../services/api.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.css']
})
export class ProjectSettingComponent implements OnInit {

  constructor(public projectService: ProjectService,
              public activeRoute: ActivatedRoute,
              public userService: UserService,
              public apiService: ApiService) { }

  project: Project;
  projectName: FormControl;
  startDate: FormControl;
  endDate: FormControl;
  checkList: boolean[];
  userList: User[];
  userItems: UserItem[];
  selectedUsers: User[];

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      const projectID = Number(routeParams.pid);
      this.project = this.projectService.getProject(projectID);
    });
    this.projectName = new FormControl(this.project.projectName);
    this.startDate = new FormControl(this.project.startDate.toISOString());
    this.endDate = new FormControl(this.project.endDate.toISOString());
    this.initUserList();
  }

  initUserList(): void {
    this.userList = this.apiService.users;
    this.userItems = [];
    for (let i = 0; i < this.userList.length; i++) {
      const temp = {
        user: this.userList[i],
        id: i
      };
      if (temp.user.uid !== this.userService.currentUser.uid
        && temp.user.uid !== 0) {
        this.userItems.push(temp);
      }
    }
    this.selectedUsers = [];
    this.checkList = new Array(this.userList.length).fill(false);
  }

  saveSetting(): void {
    this.project.projectName = this.projectName.value;
    if (this.project.endDate.getTime() > new Date(this.startDate.value).getTime()) {
      this.project.startDate = new Date(this.startDate.value);
    } else {
      this.startDate.setValue(this.project.startDate.toISOString());
    }
    if (this.project.startDate.getTime() < new Date(this.endDate.value).getTime()) {
      this.project.endDate = new Date(this.endDate.value);
    } else {
      this.endDate.setValue(this.project.endDate.toISOString());
    }
  }

  selectedUser(userItem: any) {
    this.checkList[userItem.id] = !this.checkList[userItem.id];
    let selected = false;
    this.selectedUsers.forEach(element => {
      if (userItem.user.uid === element.uid) {
        selected = true;
      }
    });
    if (!selected) {
      this.addSelectedUser(userItem.user);
    } else {
      this.removeSelectedUser(userItem.user);
    }
  }

  addSelectedUser(user: User): void {
    this.selectedUsers.push(user);
  }

  removeSelectedUser(user: User): void {
    for (let i = 0; i < this.selectedUsers.length; i++) {
      if (this.selectedUsers[i].uid === user.uid) {
        this.selectedUsers.splice(i, 1);
        i--;
      }
    }
  }
}
