import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddProject } from 'src/app/models/add-project.model';
import { User } from 'src/app/models/user.model';
import { AccessService } from 'src/app/services/access.service';

interface userItem{
  user : User;
  id: number;
}
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})



export class AddProjectComponent implements OnInit {

  userItems:userItem[];
  userList: User[];
  selectedUsers: User[];
  addProjectForm: FormGroup;
  checkList : boolean[];
  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddProject,
    public formbuilder: FormBuilder,
    public accesService: AccessService) 
    {  this.addProjectForm = this.formbuilder.group(
        {
          projectName: [''],
          startDate: [''],
          endDate: [''],
          memberArray: this.formbuilder.array([])
        }
      );

     }

  ngOnInit() {
    this.userList = this.accesService.getAllUsers();
    this.userItems = [];
    for(var i = 0; i < this.userList.length; i++){
      var temp = {
        user : this.userList[i],
        id : i
      }
      
      this.userItems.push(temp);
    }
    this.selectedUsers = [];
    this.checkList = new Array(this.userList.length).fill(false); 

  }

  addItem(user:User){
    return this.formbuilder.group({
      member: user
    });
  }
  get formArr(){
    return this.addProjectForm.get('memberArray') as FormArray;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  SelectedUser(userItem: userItem):void{
    // console.log(i);
    this.checkList[userItem.id] = !this.checkList[userItem.id];
    var selected = false;
    this.selectedUsers.forEach(element => {
      if(userItem.user.uid == element.uid) selected = true;
    });
    if(!selected) this.addSelectedUser(userItem.user);
    else this.removeSelectedUser(userItem.user);
  }
  addSelectedUser(user: User):void{
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
  addArrayToArrayForm():void{
    this.selectedUsers.forEach(element =>{
      this.formArr.push(this.addItem(element));
    });
  }
  onSubmit(){
    this.addArrayToArrayForm();
    // console.log(this.addProjectForm.value);
    this.accesService.addProject(this.addProjectForm.value);
  }

}
