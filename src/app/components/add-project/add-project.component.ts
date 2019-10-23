import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddProject } from 'src/app/models/add-project.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  users: User[];
  selectedUsers: User[];

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddProject) { }

  ngOnInit() {
    this.users = [
      {uid: "001",name: "Wachira Norasing"},
      {uid: "002",name: "Onewkub Blackguilder"},
      {uid: "003",name: "Zoneie Blackguilder"},
    ];
    this.selectedUsers = [];
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  SelectedUser(user: User):void{
    var selected = false;
    this.selectedUsers.forEach(element => {
      if(user.uid == element.uid) selected = true;
    });
    if(!selected) this.addSelectedUser(user);
    else this.removeSelectedUser(user); 
  }
  addSelectedUser(user: User):void{
    console.log(user);
    this.selectedUsers.push(user);
  }
  removeSelectedUser(user: User):void{
    for(var i = 0; i < this.selectedUsers.length; i++){
      if(this.selectedUsers[i].uid === user.uid){
        this.selectedUsers.splice(i, 1);
        i--;
      }
    }
  }
}
