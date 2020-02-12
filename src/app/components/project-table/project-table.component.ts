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

  openDialog(task: Task, member: User) {
    const dialogRef = this.dialog.open(ProjectAddTaskComponent, {
      width: '45rem',
      data: { work: task, owner: member }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  updateTable() {
    // this.memberList.forEach(user => {
    //   this.userTask.set(user.uid, this.projectService.setUserTask(user.uid, this.project));
    // });
  }

  getStyle(item: Task) {
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
