import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ProjectAddTaskComponent } from '../project-add-task/project-add-task.component';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog,
  ) { }


  ngOnInit() {
  }

  clickItem(item: Task): void {
    console.log(item);
  }
  openDialog(task, member): void {
    console.log('Open Dialog');
    const dialogRef = this.dialog.open(ProjectAddTaskComponent, {
      width: '45rem',
      data : {work: task, owner: member}

    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
