import {Component, OnInit} from '@angular/core';
import { ProjectComponent } from '../project/project.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  constructor(
    public projectComponent: ProjectComponent,
    public userService: UserService
  ) {
    // console.log(userService.getDate(this.project.startDate));
  }

  ngOnInit() {

  }
}
