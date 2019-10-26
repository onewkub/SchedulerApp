import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SideNavBarComponent} from './components/side-nav-bar/side-nav-bar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {AddProjectComponent} from './components/add-project/add-project.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';

const routes: Routes = [
  {
    path: 'dashboard', component: SideNavBarComponent, children: [
      {path: '', component: DashboardComponent},
      {path: '', pathMatch: 'full', redirectTo: ''},
      {path: 'addProject', component: AddProjectComponent},
    ], canActivate: [AuthGuard]
  },
  {
    path: 'projects', component: SideNavBarComponent,
    children: [{path: '', component: ProjectDetailComponent}]
  },
  {path: '', component: HomeComponent},
  {path: '', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
