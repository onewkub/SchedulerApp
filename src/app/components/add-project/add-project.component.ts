import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddProject } from 'src/app/models/add-project.model';
import { User } from 'src/app/models/user.model';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  users: User[];
  selectedUsers: User[];
  checked = true;
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
    this.users = this.accesService.getAllUsers();
    this.selectedUsers = [];
    this.checkList = new Array(this.users.length).fill(false);
    // console.log(this.checkList);    

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
  SelectedUser(user: User, i : number):void{
    // console.log(i);
    var selected = false;
    this.selectedUsers.forEach(element => {
      if(user.uid == element.uid) selected = true;
    });
    if(!selected) this.addSelectedUser(user);
    else this.removeSelectedUser(user);
    this.checkList[i] = !this.checkList[i];
    // console.log(this.checkList);
  }
  addSelectedUser(user: User):void{
    // console.log(user);
    this.selectedUsers.push(user);
    // this.formArr.push(this.addItem(user));
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
    console.log(this.addProjectForm.value);
  }

}
