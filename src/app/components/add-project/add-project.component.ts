<<<<<<< HEAD
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddProject } from 'src/app/models/add-project.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
=======
import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddProject} from 'src/app/models/add-project.model';
import {User} from 'src/app/models/user.model';
import {AccessService} from 'src/app/services/access.service';
import {AuthService} from '../../services/auth.service';
>>>>>>> master

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
<<<<<<< HEAD

=======
  userItems: UserItem[];
>>>>>>> master
  userList: User[];
  userItems:userItem[];
  selectedUsers: User[];
  addProjectForm: FormGroup;
  checkList: boolean[];

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddProject,
    public formBuilder: FormBuilder,
<<<<<<< HEAD
    public apiService: ApiService,
    public userService: UserService,
    public projectService: ProjectService
    )
    {  this.addProjectForm = this.formBuilder.group(
        {
          projectName: [''],
          startDate: [''],
          endDate: [''],
          memberArray: this.formBuilder.array([])
        }
      );

     }
=======
    public authService: AuthService,
    public accessService: AccessService) {
    this.addProjectForm = this.formBuilder.group(
      {
        projectName: [''],
        startDate: [''],
        endDate: [''],
        memberArray: this.formBuilder.array([])
      }
    );
  }
>>>>>>> master

  ngOnInit() {
    this.userList = this.apiService.users;
    this.userItems = [];
<<<<<<< HEAD
    for(var i = 0; i < this.userList.length; i++){
      var temp = {
        user : this.userList[i],
        id : i
      }
      if(temp.user.uid != this.userService.currentUser.uid
         && temp.user.uid != 0)
        this.userItems.push(temp);
=======
    for (let i = 0; i < this.userList.length; i++) {
      const temp = {
        user: this.userList[i],
        id: i
      };

      if (temp.user.uid !== this.authService.currentUser.uid && temp.user.uid > 0) {
        this.userItems.push(temp);
      }
>>>>>>> master
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
<<<<<<< HEAD
  SelectedUser(userItem: userItem):void{
    // console.log(this.selectedUsers);
=======

  SelectedUser(userItem: UserItem): void {
    console.log(this.selectedUsers);
>>>>>>> master
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
<<<<<<< HEAD
    console.log(this.addProjectForm.value);
    this.projectService.addProject(this.addProjectForm.value);
    this.addProjectForm.reset();
    this.onNoClick();


=======
    this.accessService.addProject(this.addProjectForm.value);
    this.addProjectForm.reset();
    this.onNoClick();
>>>>>>> master
  }
}
