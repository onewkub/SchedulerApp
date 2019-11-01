import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ProjectAddTaskComponent } from '../project-add-task/project-add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
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
  styleColor: number = 0;
  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    public projectService: ProjectService
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
      data: { work: task, owner: member }

    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateTable();
      console.log('The dialog was closed');
    });
  }
  updateTable() {
    this.memberList.forEach(element => {
      this.userTask.set(element.uid, this.projectService.setUserTask(element.uid, this.project));
    });
  }
  getStyle(item){
    // if (item.taskID == null) return null;
    var hasColor = (item.taskID != null);
    var Color: String[] = [
      '#ffeeff', '#c3fdff', '#e6ceff', '#c8e6c9'
    ];
    
    let styles = {
      'background': hasColor ? Color[this.styleColor] : null,
    }; 
    this.styleColor++;
    this.styleColor %= Color.length;
    return styles;
  }
}
