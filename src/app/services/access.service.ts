import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  userList: User[] = [];

  constructor(
    public userService: UserService
  ) {
    firebase.firestore().collection("accounts").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var temp: User = { uid: doc.data().userUID, name: doc.data().displayName };
          if (temp.uid != userService.getCurrentUserData().uid)
            this.userList.push(temp);
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  getAllUsers(): User[] {
    return this.userList;
  }
  addProject(projectForm): void {
    var project: Project;
    project = {
      projectName: projectForm.projectName,
      startDate: firebase.firestore.Timestamp.fromDate(projectForm.startDate),
      endDate: firebase.firestore.Timestamp.fromDate(projectForm.endDate),
      projectOwner: firebase.firestore().doc('account/' + this.userService.user.uid),
      members: []

    }
    projectForm.memberArray.forEach(element => {
      project.members.push(firebase.firestore().doc('accounts/' + element.member.uid));
    });
    firebase.firestore().collection("projects").add(project).then( docRef => {
      console.log("Document written with ID: ", docRef.id);
      console.log(projectForm.memberArray);
      projectForm.memberArray.forEach(element =>{
        firebase.firestore().collection('users').doc(element.member.uid).update({
          project: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc('projects/'+ docRef.id))
        });
      });
      firebase.firestore().collection('users').doc(this.userService.user.uid).update({
        project: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc('projects/'+ docRef.id))
      });


      alert("Added project succesful");
    })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    console.log(project);
  }
}
