import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProjectComponent } from './components/project/project.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'app', component: NavBarComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects/:pid', component: ProjectComponent },
      { path: 'dashboard', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
    canActivate: [AuthGuard]
  },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
