import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddProject} from 'src/app/models/add-project.model';
import {User} from 'src/app/models/user.model';
import {ApiService} from 'src/app/services/api.service';
import {UserService} from 'src/app/services/user.service';
import {ProjectService} from 'src/app/services/project.service';

interface UserItem {
  user: User;
  id: number;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {
  userList: User[];
  userItems: UserItem[];
  selectedUsers: User[];
  addProjectForm: FormGroup;
  checkList: boolean[];
  searchName: string;

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddProject,
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public userService: UserService,
    public projectService: ProjectService
  ) {
    this.addProjectForm = this.formBuilder.group(
      {
        projectName: [''],
        startDate: [''],
        endDate: [''],
        memberArray: this.formBuilder.array([])
      }
    );
  }

  ngOnInit() {
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

  addItem(user: User) {
    return this.formBuilder.group({
      member: user
    });
  }

  get formArr() {
    return this.addProjectForm.get('memberArray') as FormArray;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectedUser(userItem: UserItem): void {
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

  addArrayToArrayForm(): void {
    this.selectedUsers.forEach(user => {
      this.formArr.push(this.addItem(user));
    });
  }

  onSubmit() {
    this.addArrayToArrayForm();
    console.log(this.addProjectForm.value);
    this.projectService.addProject(this.addProjectForm.value);
    this.addProjectForm.reset();
    this.onNoClick();
  }
}
