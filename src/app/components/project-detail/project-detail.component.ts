import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  currentProjectID: number;
  currentProject: Project;
  constructor(
    public activeRoute: ActivatedRoute,
    public projectService: ProjectService
  ) {

  }

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.currentProjectID = routeParams.pid;
      this.currentProject = this.projectService.getProject(this.currentProjectID);
    });
  }



  
}
