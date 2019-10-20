import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { SideNavBarComponent} from "./components/side-nav-bar/side-nav-bar.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuard } from './guards/auth.guard';
import { AddProjectComponent } from './components/add-project/add-project.component';

const routes: Routes = [
  { path: 'app', component: SideNavBarComponent, children:[
    { path: '', component: DashboardComponent },
    { path: '', pathMatch: 'full', redirectTo: '' },
    { path: 'addProject', component: AddProjectComponent },
   ], canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
