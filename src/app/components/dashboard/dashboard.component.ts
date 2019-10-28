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


  constructor(
    public userService: UserService,
    // private datePipe: DatePipe
  ) {
    // dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.today = this.getDate(this.todayDate);
    
  }

  ngOnInit() {
  }

  getDate(date: Date){
    var months = ['Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  }
}
