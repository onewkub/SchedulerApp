import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Project } from '../models/project.model';
import { Task, TaskStatus } from '../models/task.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  lastProjectID: number;

  constructor(
    public apiService: ApiService,
    public userService: UserService
  ) {
    this.lastProjectID = apiService.project.length;
  }

  addProject(input) {
    const projectTemp: Project = {
      projectID: this.lastProjectID,
      projectName: input.projectName,
      startDate: input.startDate,
      endDate: input.endDate,
      projectOwner: this.userService.currentUser.uid,
      members: []
    };

    input.memberArray.forEach(element => {
      projectTemp.members.push(element.member.uid);
    });

    projectTemp.members.forEach(element => {
      this.apiService.userData[element].projectID.push(this.lastProjectID);
    });

    this.apiService.userData[this.userService.currentUser.uid].projectID.push(this.lastProjectID);

    this.apiService.projectDescription.push({ projectID: this.lastProjectID, description: `Example` });
    this.apiService.project.push(projectTemp);
    this.lastProjectID++;
    this.getUserProject(this.userService.currentUser.uid);
  }

  getUserProject(uid) {
    const userProjectID = this.apiService.userData.find(element => element.uid === uid).projectID;
    const userProject = [];
    userProjectID.forEach(element => {
      const temp = this.apiService.project.find(project => (project.projectID === element));
      userProject.push(temp);
    });
    this.userService.userProject = userProject;
  }

  getProject(projectID: number): Project {
    return this.apiService.project.find(element => (element.projectID === projectID));
  }

  getTasks(projectID): Task[] {
    return this.apiService.taskList.filter(task => (task.projectID === projectID));
  }

  getMember(pid): User[] {
    const result: User[] = [];
    const projectMember = this.getProject(pid).members;
    projectMember.forEach(element => {
      result.push(this.userService.getUser(element));
    });
    return result;
  }

  getDiffDays(task: Task): number {
    const diff = task.endDate.getTime() - task.startDate.getTime();
    const diffDays = diff / (1000 * 3600 * 24);
    return Math.ceil(diffDays);
  }

  setUserTask(uid: number, currentProject: Project) {
    const taskInTable: {
      task: Task,
      colspan: number
    }[] = [];
    const tempTask: Task[] = this.userService.getUserTask(uid);
    let temp: { task: Task, colspan: number };
    const currentDate: Date = new Date(currentProject.startDate);
    while (currentDate.getTime() <= currentProject.endDate.getTime()) {
      const matchTask = tempTask.find(element => {
        return element.startDate.getTime() === currentDate.getTime() && element.projectID === currentProject.projectID;
      });
      if (matchTask) {
        temp = {
          task: matchTask,
          colspan: this.getDiffDays(matchTask)
        };
        taskInTable.push(temp);
        currentDate.setDate(currentDate.getDate() + temp.colspan);

      } else {
        const blankTask = new Date(currentDate);
        temp = {
          task: {
            taskID: null,
            projectID: currentProject.projectID,
            name: '',
            description: '',
            startDate: new Date(blankTask),
            endDate: new Date(blankTask.setDate(blankTask.getDate() + 1)),
            owner: uid,
            status: TaskStatus.inProgress,
            reasonForCancel: ''
          }, colspan: 1
        };
        taskInTable.push(temp);
        currentDate.setDate(currentDate.getDate() + 1);

      }
    }
    return taskInTable;
  }

  getDateLabel(currentProject): string[] {
    const result: string[] = [];
    const currentDate: Date = new Date(currentProject.startDate);
    while (currentDate.getTime() <= currentProject.endDate.getTime()) {
      result.push(this.userService.getDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return result;
  }

  addTask(task: Task) {
    task.taskID = this.apiService.taskList.length;
    this.apiService.taskList.push(task);
  }

  deleteTask(taskID) {
    for (let i = 0; i < this.apiService.taskList.length; i++) {
      if (this.apiService.taskList[i].taskID === taskID) {
        this.apiService.taskList.splice(i, 1);
      }
    }
  }

  getProjectDescription(projectID) {
    return this.apiService.projectDescription.find(element => projectID === element.projectID);

  }
  calculateTaskStatus(): void {
    const toDay = new Date().getTime();
    this.apiService.project.forEach((project) => {
      this.getTasks(project.projectID).forEach((task) => {
        if (task.status !== TaskStatus.canceled && task.status !== TaskStatus.completed) {
          if (task.startDate.getTime() > toDay) {
            task.status = TaskStatus.pending;
          } else if (task.startDate.getTime() <= toDay && task.endDate.getTime() < toDay) {
            task.status = TaskStatus.late;
          } else {
            task.status = TaskStatus.inProgress;
          }
        }
      });
    });

  }
}
