import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/project.model';
import {FormControl} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user.model';
import {ApiService} from '../../services/api.service';
import {UserService} from '../../services/user.service';

interface UserListItem {
  id: number;
  user: User;
  selected: boolean;
}

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.css']
})
export class ProjectSettingComponent implements OnInit {

  constructor(public projectService: ProjectService,
              public activeRoute: ActivatedRoute,
              public userService: UserService,
              public apiService: ApiService) {
  }

  project: Project;
  projectName: FormControl;
  startDate: FormControl;
  endDate: FormControl;

  userList: User[];
  userListItems: UserListItem[];
  selectedUsers: User[];
  searchName: string;

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.project = this.projectService.getProject(Number(routeParams.pid));
      this.setFormValue();
    });
  }

  initUserList(): void {
    let itemID = 0;
    this.selectedUsers = this.projectService.getMember(this.project.projectID).filter(user => user.uid !== this.project.projectOwner);
    this.userList = this.apiService.users.filter(user => user.uid !== this.project.projectOwner && user.uid !== 0);
    this.userListItems = this.userList.map(user => {
      const item = {id: itemID, user, selected: this.selectedUsers.includes(user)};
      itemID++;
      return item;
    });
  }

  setFormValue(): void {
    this.initUserList();
    this.projectName = new FormControl(this.project.projectName);
    this.startDate = new FormControl(this.project.startDate.toISOString());
    this.endDate = new FormControl(this.project.endDate.toISOString());
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
    this.project.members = this.selectedUsers.map(user => user.uid);
  }

  selectUser(item: UserListItem) {
    item.selected = !item.selected;
    if (item.selected) {
      this.selectedUsers.push(item.user);
    } else {
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.uid !== item.user.uid);
    }
    this.selectedUsers.sort(((a, b) => a.uid - b.uid));
  }
}
