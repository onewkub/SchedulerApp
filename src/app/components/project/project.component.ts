import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ActivatedRoute} from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
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
  public dateLabel: string[];
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
      this.dateLabel = this.projectService.getDateLabel(this.currentProject);
      this.memberList.forEach(element => {
        this.userTask.set(element.uid, this.projectService.setUserTask(element.uid, this.currentProject));
      });

    });
  }
}
