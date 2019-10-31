import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ProjectAddTaskComponent } from '../project-add-task/project-add-task.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

  @Input() taskList: Task[];
  @Input() project: Project;
  @Input() memberList: User[];
  @Input() dateLabel: String[];
  @Input() userTask = new Map();
  constructor(
    public userService: UserService,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    // move this content to Project Component
    // this.dateLabel = this.getDateLabel();
    // this.memberList.forEach(element => {
    //   this.userTask.set(element.uid, this.setTask(element.uid));
    //   // console.log(this.userTask.get(element.uid));
    // });
  }

  // showTaskAndProject(): void {
  //   console.log(this.taskList);
  //   console.log(this.project);
  //   console.log(this.memberList);
  //   console.log(this.dateLabel);
  // }

  // getDiffDays(task: Task):number {
  //   var diff = task.endDate.getTime() - task.startDate.getTime();
  //   var diffDays = diff / (1000 * 3600 * 24);
  //   return diffDays;
  // }

  // getDateLabel(): String[] {
  //   var rlt: String[] = [];
  //   var currentDate: Date = new Date(this.project.startDate);
  //   while (currentDate.getTime() <= this.project.endDate.getTime()) {
  //     rlt.push(this.userService.getDate(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  //   return rlt;
  // }

  // setTask(uid:number){
  //   var taskInTable: {
  //     task: Task,
  //     colspan: number
  //   }[] = [];
  //   var tempTask: Task[] = this.userService.getUserTask(uid);
  //   var temp: { task: Task, colspan: number };
  //   // var totalDayProject = (this.project.endDate.getDate() - this.project.startDate.getDate())/(1000*3600*24);
  //   var currentDate: Date = new Date(this.project.startDate);
  //   // console.log(tempTask);
  //   while (currentDate.getTime() <= this.project.endDate.getTime()) {
  //     var mathchTask = tempTask.find(element => {  
  //       // console.log(element.startDate + " == " +currentDate + " : " +(element.startDate.getTime() === currentDate.getTime()));
  //       return element.startDate.getTime() === currentDate.getTime() ;
  //     });
  //     // console.log(uid+ " : " +currentDate+" : "+mathchTask)
  //     if (mathchTask) {
  //       temp = {
  //         task: mathchTask,
  //         colspan: this.getDiffDays(mathchTask)
  //       };
  //       taskInTable.push(temp);
  //       currentDate.setDate(currentDate.getDate() + this.getDiffDays(mathchTask));

  //     }
  //     else {
  //       var blankTask = new Date(currentDate);
  //       temp = { task: {
  //         taskID: null,
  //         projectID: this.project.projectID,
  //         name: "",
  //         description: "",
  //         startDate: new Date(blankTask),
  //         endDate: new Date(blankTask.setDate(blankTask.getDate() + 1)),
  //         owner: uid,
  //         status: 3
  //       }, colspan: 1 };
  //       // console.log(temp.task.endDate);
  //       taskInTable.push(temp);
  //       currentDate.setDate(currentDate.getDate() + 1);

  //     }
  //   }
  //   // console.log(taskInTable);
  //   return taskInTable;
  // }
  clickItem(item: Task):void{
    console.log(item); 
  }
  openDialog(): void {
    console.log('Open Dialog');
    const dialogRef = this.dialog.open(ProjectAddTaskComponent, {
      width: '30em'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
