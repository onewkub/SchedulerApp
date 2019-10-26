import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddProject} from 'src/app/models/add-project.model';
import {User} from 'src/app/models/user.model';
import {AccessService} from 'src/app/services/access.service';

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

  userItems: UserItem[];
  userList: User[];
  selectedUsers: User[];
  addProjectForm: FormGroup;
  checkList: boolean[];

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddProject,
    public formBuilder: FormBuilder,
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

  ngOnInit() {
    this.userList = this.accessService.getAllUsers();
    this.userItems = [];
    for (let i = 0; i < this.userList.length; i++) {
      const temp = {
        user: this.userList[i],
        id: i
      };

      this.userItems.push(temp);
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

  SelectedUser(userItem: UserItem): void {
    console.log(this.selectedUsers);
    // console.log(i);
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
    this.selectedUsers.forEach(element => {
      this.formArr.push(this.addItem(element));
    });
  }

  onSubmit() {
    this.addArrayToArrayForm();
    // console.log(this.addProjectForm.value);
    this.accessService.addProject(this.addProjectForm.value);
    this.addProjectForm.reset();
    this.onNoClick();

  }

}
