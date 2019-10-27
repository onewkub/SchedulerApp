import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  currentProjectID: number;
  constructor(
    public route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.currentProjectID = +this.route.snapshot.paramMap.get('pid');
    console.log(this.currentProjectID);
  }

}
