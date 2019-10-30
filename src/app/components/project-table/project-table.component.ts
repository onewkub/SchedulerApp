import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

  @Input() taskList: Task[];
  @Input() project: Project;
  @Input() memberList: User[];
  dateLabel: String[];
  constructor(
    public userSevice: UserService
  ) { }


  ngOnInit() {
    this.dateLabel = this.getDateLabel();
  }

  showTaskAndProject(): void {
    console.log(this.taskList);
    console.log(this.project);
    console.log(this.memberList);
    console.log(this.dateLabel);
  }

  getDiffDays(task: Task) {
    var diff = task.endDate.getTime() - task.startDate.getTime();
    var diffDays = diff / (1000 * 3600 * 24);
    return diffDays;
  }

  getDateLabel(): String[] {
    var rlt: String[] = [];
    var currentDate: Date = new Date(this.project.startDate);
    while (currentDate <= this.project.endDate) {
      rlt.push(this.userSevice.getDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return rlt;
  }

  setTask(uid): any{
    var taskInTable: {
      task: Task,
      colspan: number
    }[] = [];
    var tempTask: Task[] = this.userSevice.getUserTask(uid);
    var temp: { task: Task, colspan: number };
    // var totalDayProject = (this.project.endDate.getDate() - this.project.startDate.getDate())/(1000*3600*24);
    var currentDate: Date = new Date(this.project.startDate);
    while (currentDate <= this.project.endDate) {
      var mathchTask = tempTask.find(element => { return element.startDate == currentDate });
      if (mathchTask != null) {
        temp = {
          task: mathchTask,
          colspan: this.getDiffDays(mathchTask)
        };
        taskInTable.push(temp);
      }
      else {
        temp = { task: null, colspan: 1 };
        taskInTable.push(temp);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return taskInTable;
  }
}
