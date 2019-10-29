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
  getRemainingDay(endDate: Date):string{
    var diff = endDate.getTime() - this.todayDate.getTime();
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if(diff >= 0){
      return diffDays + " Days";
    }
    return "Late";
  }
  getProgress(project: Project){
    var diff = project.endDate.getTime() - project.startDate.getTime();
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    var currentDate = this.todayDate.getTime() - project.startDate.getTime();
    var currentDays = Math.ceil(currentDate / (1000 * 3600 * 24));
    var progress;
    if(currentDate < 0){
      progress = 0;
    }
    else{
      progress = ((diffDays-currentDays)/diffDays)*100;
  }
    // console.log(project.projectName + " : " + progress + " : " + currentDays + " " + diffDays)
    return progress;



  }
}
