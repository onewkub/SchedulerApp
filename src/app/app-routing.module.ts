import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddProjectComponent} from './components/add-project/add-project.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';
import {SideNavBarComponent} from './components/side-nav-bar/side-nav-bar.component';

const routes: Routes = [
  {
    path: 'app', component: SideNavBarComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'projects/:pid', component: ProjectDetailComponent},
      {path: 'addProject', component: AddProjectComponent},
      {path: '', pathMatch: 'full', redirectTo: ''},
    ]
  },
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
