import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Project} from '../models/project.model';
import {Task, TaskStatus} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public users: User[];
  public userData: { uid: number; projectID: number[] }[];
  public authTable: { uid: number; email: string; password: string; logedIn: boolean }[];
  public project: Project[];
  public taskList: Task[];

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
        email: 'livenze2397@gmail.com'
      },
      {
        uid: 3,
        displayName: 'Nattakit Hosapsin',
        email: 'relta@chifumi.net'
      }
    ];

    this.authTable = [
      {uid: 1, email: 'oldnew123@gmail.com', password: 'onewkub123', logedIn: false},
      {uid: 2, email: 'Livenze2397@gmail.com', password: '12345678', logedIn: false},
      {uid: 3, email: 'relta@chifumi.net', password: '2oDydeJVPZs2zRsW', logedIn: false},
    ];

    this.project = [
      {
        projectID: 0,
        projectName: 'Project Alpha',
        startDate: new Date('2019-10-27'),
        endDate: new Date('2019-11-11'),
        projectOwner: 0,
        members: [1, 2, 3]
      },
      {
        projectID: 1,
        projectName: 'Project Beta',
        startDate: new Date('2019-10-25'),
        endDate: new Date('2019-10-31'),
        projectOwner: 1,
        members: [1, 2, 3]
      }
    ];

    this.userData = [
      {uid: 0, projectID: [0, 1]},
      {uid: 1, projectID: [0, 1]},
      {uid: 2, projectID: [0, 1]},
      {uid: 3, projectID: [0, 1]},
    ];

    this.taskList = [
      {
        taskID: 0,
        projectID: 0,
        name: 'Task One',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget ullamcorper eros, posuere volutpat lacus.',
        startDate: new Date('2019-10-27'),
        endDate: new Date('2019-10-28'),
        owner: 1,
        status: TaskStatus.inProgress
      },
      {
        taskID: 1,
        projectID: 0,
        name: 'Task Two',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget ullamcorper eros, posuere volutpat lacus.',
        startDate: new Date('2019-10-28'),
        endDate: new Date('2019-11-09'),
        owner: 2,
        status: TaskStatus.pending
      },
      {
        taskID: 2,
        projectID: 0,
        name: 'Task Three',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget ullamcorper eros, posuere volutpat lacus.',
        startDate: new Date('2019-11-09'),
        endDate: new Date('2019-11-11'),
        owner: 3,
        status: TaskStatus.pending
      }
    ];
  }
}
