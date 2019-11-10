import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {Project} from 'src/app/models/project.model';
import {TaskStatus} from '../../models/task.model';
import {ProjectService} from '../../services/project.service';

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
  currentTasks = this.userService.getUserTask(this.userService.currentUser.uid).filter((task) => {
    this.projectService.calculateTaskStatus();
    return task.status === TaskStatus.inProgress || task.status === TaskStatus.late;
  });

  constructor(
    public userService: UserService,
    public projectService: ProjectService
  ) {
    // dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.today = this.userService.getDate(this.todayDate);

  }

  ngOnInit() {
    console.log(this.currentTasks);
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
    var diffDays = Math.floor(diff / (1000 * 3600 * 24));
    var currentDate = this.todayDate.getTime() - project.startDate.getTime();
    var currentDays = Math.floor(currentDate / (1000 * 3600 * 24));
    var progress;
    if(currentDate < 0){
      progress = 0;
    }
    else{
      progress = ((currentDays)/diffDays)*100;
    }
    // console.log(project.projectName + " : " + progress + " : " + currentDays + " " + diffDays)
    return progress;



  }
}
