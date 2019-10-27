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
    public activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    // this.currentProjectID = +this.activeRoute.snapshot.paramMap.get('pid');
    // console.log(this.activeRoute.snapshot.paramMap);
    // this.activeRoute.queryParams.subscribe(queryParams => {
    //   // do something with the query params
    //   console.log(queryParams);
    // });
    this.activeRoute.params.subscribe(routeParams => {
      // this.loadUserDetail(routeParams.id);
      this.currentProjectID = routeParams.pid;
      // console.log(routeParams);

    });
  }

}
