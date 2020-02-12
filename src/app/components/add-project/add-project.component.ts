import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';

interface UserItem {
  user: User;
  selected: boolean;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {
  searchName: string;
  addProjectForm: FormGroup;
  userItems: UserItem[];

  constructor(
    private dialogRef: MatDialogRef<AddProjectComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService
  ) {
    this.addProjectForm = this.formBuilder.group(
      {
        name: [''],
        startDate: [''],
        endDate: [''],
      }
    );
  }

  ngOnInit() {
    this.createUserItems();
  }

  createUserItems() {
    this.userService.getUsers().subscribe(users => {
      this.userItems = users.map(
        user => ({ user, selected: false })
      );
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  selecteUserItem(selectedItem: UserItem) {
    this.userItems = this.userItems.map(
      item => ({
        user: item.user,
        selected: selectedItem.user.uid === item.user.uid ? !item.selected : item.selected
      })
    );
  }

  getSelectUserItems(): UserItem[] {
    if (this.userItems !== undefined) {
      return this.userItems.filter(
        item => item.selected
      );
    } else {
      return null;
    }
  }

  onSubmit() {
    const member = this.getSelectUserItems().map(item => item.user.uid);
    this.userService.getCurrentUser().subscribe(user => {
      member.push(user.uid);
      this.projectService.addProject({
        uid: '',
        name: this.addProjectForm.value.name,
        startDate: this.addProjectForm.value.startDate === '' ? new Date() : this.addProjectForm.value.startDate,
        endDate: this.addProjectForm.value.endDate === '' ? new Date() : this.addProjectForm.value.endDate,
        manager: user.uid,
        member,
        description: ''
      });
    });
    this.onClose();
  }
}
