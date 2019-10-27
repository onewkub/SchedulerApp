import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddProjectComponent} from './components/add-project/add-project.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';
import {BaseComponent} from './components/base/base.component';

const routes: Routes = [
  {
    path: 'app', component: BaseComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'projects/:pid', component: ProjectDetailComponent},
      {path: 'addProject', component: AddProjectComponent},
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
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
