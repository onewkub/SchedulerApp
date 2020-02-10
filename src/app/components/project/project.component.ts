import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public currentProjectID: number;
  public currentProject: Project;
  public memberList: User[];
  public dateList: Date[];
  public userTask = new Map();
  public isProjectOwner: boolean;

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
      this.memberList = this.projectService.getMembers(this.currentProjectID);
      this.dateList = this.getDateList(this.currentProject);
      this.memberList.forEach(element => {
        this.userTask.set(element.uid, this.projectService.setUserTask(element.uid, this.currentProject));
      });
      this.isProjectOwner = this.currentProject.projectOwnerID === this.userService.getCurrentUserID();
    });
  }

  updateProject() {
    this.memberList = this.projectService.getMembers(this.currentProjectID);
    this.dateList = this.getDateList(this.currentProject);
    this.memberList.forEach(element => {
      this.userTask.set(element.uid, this.projectService.setUserTask(element.uid, this.currentProject));
    });
  }

  getDateList(project: Project): Date[] {
    const result: Date[] = [];
    const currentDate: Date = new Date(project.startDate);
    while (currentDate.getTime() <= project.endDate.getTime()) {
      result.push(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return result;
  }

  onTabChange(event: MatTabChangeEvent) {
    this.updateProject();
  }
}
