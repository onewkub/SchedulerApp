import {Component, OnInit, Input} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project : Project; 
  @Input() projectDescription: any;
  constructor(
    public userService: UserService
  ) {
    
  }

  ngOnInit() {

  }
}
