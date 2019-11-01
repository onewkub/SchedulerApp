import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SideNavBarComponent} from './components/side-nav-bar/side-nav-bar.component';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
  {
    path: 'app', component: SideNavBarComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'projects/:pid', component: ProjectComponent},
      {path: 'dashboard', pathMatch: 'full', redirectTo: 'dashboard'},
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
