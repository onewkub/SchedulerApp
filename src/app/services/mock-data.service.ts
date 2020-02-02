import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  public users: User[];
  public authTable: { uid: number; email: string; password: string; logedIn: boolean }[];
  public project: Project[];
  public taskList: Task[];

  constructor() {
    this.users = [
      {
        uid: 0,
        displayName: 'Wachira Norasing',
        email: 'oldnew123@gmail.com'
      },
      {
        uid: 1,
        displayName: 'Tapanapong Chuntama',
        email: 'livenze2397@gmail.com'
      },
      {
        uid: 2,
        displayName: 'Nattakit Hosapsin',
        email: 'relta@chifumi.net'
      }
    ];

    this.authTable = [
      { uid: 0, email: 'oldnew123@gmail.com', password: 'onewkub123', logedIn: false },
      { uid: 1, email: 'Livenze2397@gmail.com', password: '12345678', logedIn: false },
      { uid: 2, email: 'relta@chifumi.net', password: '2oDydeJVPZs2zRsW', logedIn: false },
    ];

    this.project = [
      {
        projectID: 0,
        projectName: 'Project Alpha',
        startDate: new Date('2019-10-27'),
        endDate: new Date('2019-11-11'),
        projectOwnerID: 0,
        membersID: [0, 1, 2],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis orci non mi accumsan, egestas ullamcorper sapien condimentum.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam vel convallis ipsum.
        Nulla sagittis lobortis massa id scelerisque. Pellentesque at metus sit amet elit porttitor tempus.
        In sodales elementum sem, eget pharetra nulla varius quis. Aenean cursus dui vitae eros faucibus,
        et congue leo scelerisque. Cras iaculis sagittis faucibus. Nulla facilisi. Donec sollicitudin sollicitudin faucibus.
        Curabitur in sapien ullamcorper, hendrerit ipsum mattis, commodo turpis. Proin nec dignissim odio.
        Nullam pulvinar dictum diam, vel malesuada lacus faucibus eget.`
      },
      {
        projectID: 1,
        projectName: 'Project Beta',
        startDate: new Date('2019-10-25'),
        endDate: new Date('2019-10-31'),
        projectOwnerID: 1,
        membersID: [0, 1, 2],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis orci non mi accumsan, egestas ullamcorper sapien condimentum.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam vel convallis ipsum.
        Nulla sagittis lobortis massa id scelerisque. Pellentesque at metus sit amet elit porttitor tempus.
        In sodales elementum sem, eget pharetra nulla varius quis. Aenean cursus dui vitae eros faucibus,
        et congue leo scelerisque. Cras iaculis sagittis faucibus. Nulla facilisi. Donec sollicitudin sollicitudin faucibus.
        Curabitur in sapien ullamcorper, hendrerit ipsum mattis, commodo turpis. Proin nec dignissim odio.
        Nullam pulvinar dictum diam, vel malesuada lacus faucibus eget.`
      },
      {
        projectID: 2,
        projectName: 'Project Charlie',
        startDate: new Date('2019-10-25'),
        endDate: new Date('2019-11-30'),
        projectOwnerID: 2,
        membersID: [0, 1, 2],
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis orci non mi accumsan, egestas ullamcorper sapien condimentum.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam vel convallis ipsum.
        Nulla sagittis lobortis massa id scelerisque. Pellentesque at metus sit amet elit porttitor tempus.
        In sodales elementum sem, eget pharetra nulla varius quis. Aenean cursus dui vitae eros faucibus,
        et congue leo scelerisque. Cras iaculis sagittis faucibus. Nulla facilisi. Donec sollicitudin sollicitudin faucibus.
        Curabitur in sapien ullamcorper, hendrerit ipsum mattis, commodo turpis. Proin nec dignissim odio.
        Nullam pulvinar dictum diam, vel malesuada lacus faucibus eget.`
      }
    ];

    this.taskList = [
      {
        taskID: 0,
        projectID: 0,
        name: 'Task One',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget ullamcorper eros, posuere volutpat lacus.',
        startDate: new Date('2019-10-27'),
        endDate: new Date('2019-10-28'),
        ownerID: 0,
        status: TaskStatus.inProgress,
        reasonForCancel: ''
      },
      {
        taskID: 1,
        projectID: 0,
        name: 'Task Two',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget ullamcorper eros, posuere volutpat lacus.',
        startDate: new Date('2019-10-28'),
        endDate: new Date('2019-11-09'),
        ownerID: 1,
        status: TaskStatus.pending,
        reasonForCancel: ''
      },
      {
        taskID: 2,
        projectID: 0,
        name: 'Task Three',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget ullamcorper eros, posuere volutpat lacus.',
        startDate: new Date('2019-11-09'),
        endDate: new Date('2019-11-11'),
        ownerID: 2,
        status: TaskStatus.pending,
        reasonForCancel: ''
      }
    ];
  }
}
