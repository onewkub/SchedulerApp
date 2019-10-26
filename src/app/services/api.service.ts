import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public users: User[];
  public userData: { uid: number; projectID: number[] }[];
  public authTable: { uid: number; email: string; password: string; logedIn: boolean }[];
  public project: Project[];
  constructor() {
    this.users = [
      {
        uid: 0,
        displayName: 'test Account',
        email: 'test@scheduler.com'
      }
      ,
      {
        uid: 1,
        displayName: 'Wachira Norasing',
        email: 'oldnew123@gmail.com'
      },
      {
        uid: 2,
        displayName: 'Tapanapong Chuntama',
        email: 'Livenze2397@gmail.com'
      }
    ];
    this.authTable = [
      { uid: 1, email: 'oldnew123@gmail.com', password: 'onewkub123', logedIn: false },
      { uid: 2, email: 'Livenze2397@gmail.com', password: '12345678', logedIn: false },
    ];
    this.project = [
      {
        projectID: 0,
        projectName: "FirstProject",
        startDate: new Date("2019-10-27"),
        endDate: new Date("2019-10-30"),
        projectOwner: 0,
        members: [1, 2]
      }
    ];
    this.userData = [
      { uid: 0, projectID: [0] },
      { uid: 1, projectID: [0]},
      { uid: 2, projectID: [0]}  
    ];
  }


}
