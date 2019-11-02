// Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
// Core Module
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
// Other Import
// import {environment} from '../environments/environment';
// Components
import {AppComponent} from './app.component';
import {SideNavBarComponent} from './components/side-nav-bar/side-nav-bar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {HomeComponent} from './components/home/home.component';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {AuthGuard} from './guards/auth.guard';
import {AddProjectComponent} from './components/add-project/add-project.component';

import {MAT_CHECKBOX_CLICK_ACTION, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';
import {ProjectTaskComponent} from './components/project-task/project-task.component';
import {ProjectComponent} from './components/project/project.component';
import {ProjectSettingComponent} from './components/project-setting/project-setting.component';
import {ProjectTableComponent} from './components/project-table/project-table.component';
import {ProjectAddTaskComponent} from './components/project-add-task/project-add-task.component';
import {ConfirmTaskStatusComponent} from './components/confirm-task-status/confirm-task-status.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {ConfirmTaskCancelComponent} from './components/comfirm-task-cancel/confirm-task-cancel.component';
import { EditDetailDIalogComponent } from './components/edit-detail-dialog/edit-detail-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    AddProjectComponent,
    ProjectDetailComponent,
    ProjectTaskComponent,
    ProjectComponent,
    ProjectSettingComponent,
    ProjectTableComponent,
    ProjectAddTaskComponent,
    ConfirmTaskStatusComponent,
    ConfirmDialogComponent,
    ConfirmTaskCancelComponent,
    EditDetailDIalogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatNativeDateModule,
    Ng2SearchPipeModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmTaskStatusComponent,
    ConfirmTaskCancelComponent,
    ConfirmDialogComponent,
    AddProjectComponent,
    ProjectAddTaskComponent,
    EditDetailDIalogComponent
  ],
})
export class AppModule {
}
