import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ActivatedRoute} from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public currentProjectID: number;
  public currentProject: Project;
  public memberList: User[];
  public dateLabel: String[];
  public userTask = new Map();


  constructor(
    public activeRoute: ActivatedRoute,
    public projectService: ProjectService,
    public userService: UserService,
  ) {

  }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.currentProjectID = Number(routeParams.pid);
      this.currentProject = this.projectService.getProject(this.currentProjectID);
      this.memberList = this.projectService.getMember(this.currentProjectID);
      this.dateLabel = this.getDateLabel();
      this.memberList.forEach(element => {
        this.userTask.set(element.uid, this.setTask(element.uid));
      });

    });
  }
  setTask(uid:number){
    var taskInTable: {
      task: Task,
      colspan: number
    }[] = [];
    var tempTask: Task[] = this.userService.getUserTask(uid);
    var temp: { task: Task, colspan: number };
    var currentDate: Date = new Date(this.currentProject.startDate);
    while (currentDate.getTime() <= this.currentProject.endDate.getTime()) {
      var mathchTask = tempTask.find(element => {  
        return element.startDate.getTime() === currentDate.getTime() && element.projectID == this.currentProjectID;
      });
      if (mathchTask) {
        temp = {
          task: mathchTask,
          colspan: Math.ceil(this.projectService.getDiffDays(mathchTask))
        };
        taskInTable.push(temp);
        currentDate.setDate(currentDate.getDate() + temp.colspan);

      }
      else {
        var blankTask = new Date(currentDate);
        temp = { task: {
          taskID: null,
          projectID: this.currentProject.projectID,
          name: "",
          description: "",
          startDate: new Date(blankTask),
          endDate: new Date(blankTask.setDate(blankTask.getDate() + 1)),
          owner: uid,
          status: TaskStatus.pending
        }, colspan: 1 };
        taskInTable.push(temp);
        currentDate.setDate(currentDate.getDate() + 1);

      }
    }
    console.log(taskInTable);
    return taskInTable;
  }


  getDateLabel(): String[] {
    var rlt: String[] = [];
    var currentDate: Date = new Date(this.currentProject.startDate);
    while (currentDate.getTime() <= this.currentProject.endDate.getTime()) {
      rlt.push(this.userService.getDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return rlt;
  }
}
