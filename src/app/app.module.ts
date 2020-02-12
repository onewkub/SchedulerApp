// Angular Material Components
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

// Angular core Module
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Extra Angular modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Other Import
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { environment } from '../environments/environment';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

// Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectTaskComponent } from './components/project-task/project-task.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectSettingComponent } from './components/project-setting/project-setting.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { ProjectAddTaskComponent } from './components/project-add-task/project-add-task.component';
import { ConfirmTaskStatusComponent } from './components/confirm-task-status/confirm-task-status.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmTaskCancelComponent } from './components/comfirm-task-cancel/confirm-task-cancel.component';
import { EditDetailDIalogComponent } from './components/edit-detail-dialog/edit-detail-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
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
    Ng2SearchPipeModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
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
