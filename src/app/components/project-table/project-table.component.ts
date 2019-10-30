import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

  constructor() { 
    // console.log(this.taskList);

  }
  @Input() taskList: Task[];

  ngOnInit() {

  }
  showTask():void{
    console.log(this.taskList);
  }
  getDiffDays(task: Task){
    var diff = task.endDate.getTime() - task.startDate.getTime();
    var diffDays = diff /(1000 * 3600 * 24);
    return diffDays;

  }
}
