import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProjectComponent } from './components/project/project.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: NavBarComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'projects/:uid', component: ProjectComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'auth', component: WelcomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
