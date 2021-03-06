import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { FormControl } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { firestore } from 'firebase';

interface UserListItem {
  id: number;
  user: User;
  selected: boolean;
}

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.css']
})
export class ProjectSettingComponent implements OnInit {

  constructor(
    public projectService: ProjectService,
    public activeRoute: ActivatedRoute,
    public userService: UserService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  project: Project;
  projectName: FormControl;
  startDate: FormControl;
  endDate: FormControl;

  userList: User[];
  userListItems: UserListItem[];
  selectedUsers: User[];
  searchName: string;

  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      // this.project = this.projectService.getCachedProject(routeParams.uid);
      this.project = null;
      this.setFormValue();
    });
  }

  initUserList(): void {
    let itemID = 0;
    // this.selectedUsers = this.projectService.getMembers(this.project.projectID).filter(user => user.uid !== this.project.projectOwnerID);
    // this.userList = this.userService.getUsers().filter(user => user.uid !== this.project.projectOwnerID);
    this.userListItems = this.userList.map(user => {
      const item = { id: itemID++, user, selected: this.selectedUsers.includes(user) };
      return item;
    });
  }

  setFormValue(): void {
    this.initUserList();
    this.projectName = new FormControl(this.project.name);
    this.startDate = new FormControl(this.project.startDate.toDate().toISOString());
    this.endDate = new FormControl(this.project.endDate.toDate().toISOString());
  }

  saveSetting(): void {
    this.project.name = this.projectName.value;
    if (this.project.endDate.toDate().getTime() > new Date(this.startDate.value).getTime()) {
      this.project.startDate = firestore.Timestamp.fromDate(new Date(this.startDate.value));
    } else {
      this.startDate.setValue(this.project.startDate.toDate().toISOString());
    }
    if (this.project.startDate.toDate().getTime() < new Date(this.endDate.value).getTime()) {
      this.project.endDate = firestore.Timestamp.fromDate(new Date(this.endDate.value));
    } else {
      this.endDate.setValue(this.project.endDate.toDate().toISOString());
    }
    // this.project.membersID = this.selectedUsers.map(user => user.uid);
    this.project.member.push(this.project.manager);
    alert('The project settings have been saved.');
  }

  selectUser(item: UserListItem) {
    item.selected = !item.selected;
    if (item.selected) {
      this.selectedUsers.push(item.user);
    } else {
      this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.uid !== item.user.uid);
    }
    // this.selectedUsers.sort(((a, b) => a.uid - b.uid));
  }
  deleteProject() {
    // this.projectService.deleteProject(this.project.uid);
    // this.projectService.getUserProjects(this.userService.getCurrentUserID());
    this.router.navigate(['app/dashboard']);
  }
  onDelete() {
    this.openConfirmDialog();
  }
  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30rem',
    });
    dialogRef.componentInstance.title = 'Delete Project';
    dialogRef.componentInstance.desc = 'Confirm to DELETE THIS PROJECT';
    dialogRef.componentInstance.confirm = false;

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.confirm) {
        this.deleteProject();
      }
    });
  }
}
