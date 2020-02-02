import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';
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
  @Input() dateList: Date[];
  @Input() userTask = new Map();
  styleColor = 0;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  clickItem(item: Task) {
    console.log(item);
  }

  openDialog(task, member) {
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

  getStyle(item) {
    const hasColor = (item.taskID != null);
    const Color: string[] = [
      '#ffeeff', '#c3fdff', '#e6ceff', '#c8e6c9'
    ];

    const styles = {
      background: hasColor ? Color[this.styleColor] : null,
    };
    this.styleColor++;
    this.styleColor %= Color.length;
    return styles;
  }
}
