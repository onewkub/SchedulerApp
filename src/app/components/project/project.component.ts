import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public currentProjectID: number;
  public currentProject: Project;

  constructor(
    public activeRoute: ActivatedRoute,
    public projectService: ProjectService
  ) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.currentProjectID = Number(routeParams.pid);
      this.currentProject = this.projectService.getProject(this.currentProjectID);
    });
  }
}
