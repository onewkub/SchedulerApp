import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import { Project } from 'src/app/models/project.model';
// import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  todayDate = new Date();
  today: string;
  months = ['Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];

  constructor(
    public userService: UserService,
    // private datePipe: DatePipe
  ) {
    // this.todayDateString = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
    this.today = this.todayDate.getDate() + ' ' + this.months[this.todayDate.getMonth()] + ' ' + this.todayDate.getFullYear();
    
  }

  ngOnInit() {
  }
}
