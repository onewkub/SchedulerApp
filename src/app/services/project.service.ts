import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectCollection: AngularFirestoreCollection<Project>;

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {
    this.projectCollection = this.firestore.collection<Project>('projects');
  }

  addProject(project: Project) {
    const projectRef = this.projectCollection.add(project);
    projectRef.then(ref => {
      const newUID: Project = {
        uid: ref.id,
      };
      ref.update(newUID);
    });
  }

  getProject(projectID: number): Project {
    // return this.dataService.project.find(project => (project.projectID === projectID));
    return null;
  }

  getTasks(projectID: number): Task[] {
    // return this.dataService.taskList.filter(task => (task.projectID === projectID));
    return null;
  }

  getMembers(projectID: number): User[] {
    // return this.getProject(projectID).membersID.map(id => this.userService.getUser(id));
    return null;
  }

  getOwner(projectID: number): User {
    // return this.userService.getUser(this.getProject(projectID).projectOwnerID);
    return null;
  }

  getDiffDays(task: Task): number {
    const diff = task.endDate.getTime() - task.startDate.getTime();
    const diffDays = diff / (1000 * 3600 * 24);
    return Math.ceil(diffDays);
  }

  getUserProjects(userID: number): Project[] {
    // return this.dataService.project.filter(project => project.membersID.includes(userID));
    return null;
  }

  isOwnedByCurrentUser(projectID: number): boolean {
    // return this.getProject(projectID).projectOwnerID === this.userService.getCurrentUserID();
    return true;
  }

  setUserTask(uid: number, currentProject: Project) {
    // const taskInTable: {
    //   task: Task,
    //   colspan: number
    // }[] = [];
    // const userTasks: Task[] = this.userService.getUserTask(uid);
    // let temp: { task: Task, colspan: number };
    // const currentDate: Date = new Date(currentProject.startDate);
    // while (currentDate.getTime() <= currentProject.endDate.getTime()) {
    //   const matchTask = userTasks.find(task => {
    //     return task.startDate.getTime() === currentDate.getTime() && task.projectID === currentProject.projectID;
    //   });
    //   const matchTask = null;
    //   if (matchTask) {
    //     temp = {
    //       task: matchTask,
    //       colspan: this.getDiffDays(matchTask)
    //     };
    //     taskInTable.push(temp);
    //     currentDate.setDate(currentDate.getDate() + temp.colspan);
    //   } else {
    //     const blankTask = new Date(currentDate);
    //     temp = {
    //       task: {
    //         taskID: null,
    //         projectID: currentProject.projectID,
    //         name: '',
    //         description: '',
    //         startDate: new Date(blankTask),
    //         endDate: new Date(blankTask.setDate(blankTask.getDate() + 1)),
    //         ownerID: uid,
    //         status: TaskStatus.inProgress,
    //         reasonForCancel: ''
    //       }, colspan: 1
    //     };
    //     taskInTable.push(temp);
    //     currentDate.setDate(currentDate.getDate() + 1);

    //   }
    // }
    // return taskInTable;
    return null;
  }

  addTask(task: Task) {
    // task.taskID = this.dataService.taskList.length;
    // this.dataService.taskList.push(task);
  }

  deleteTask(taskID: number) {
    // for (let i = 0; i < this.dataService.taskList.length; i++) {
    //   if (this.dataService.taskList[i].taskID === taskID) {
    //     this.dataService.taskList.splice(i, 1);
    //   }
    // }
  }

  updateTaskStatus() {
    // const toDay = new Date().getTime();
    // this.dataService.project.forEach((project) => {
    //   this.getTasks(project.projectID).forEach((task) => {
    //     if (task.status !== TaskStatus.canceled && task.status !== TaskStatus.completed) {
    //       if (task.startDate.getTime() > toDay) {
    //         task.status = TaskStatus.pending;
    //       } else if (task.startDate.getTime() <= toDay && task.endDate.getTime() < toDay) {
    //         task.status = TaskStatus.late;
    //       } else {
    //         task.status = TaskStatus.inProgress;
    //       }
    //     }
    //   });
    // });
  }

  deleteProject(projectId: number) {
    // this.dataService.project = this.dataService.project.filter(project => projectId !== project.projectID);
  }
}
