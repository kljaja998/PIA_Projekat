import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AgentComponent } from './components/agent/agent.component';
import { RoutePaths } from './enums/route-paths';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RealEstatesComponent } from './components/real-estates/real-estates.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { PropertyComponent } from './components/property/property.component';


const routes: Routes = [
  {path : RoutePaths.Login, component : LoginComponent, canActivate:[AuthGuard]},
  {path : RoutePaths.Admin, component : AdminComponent, canActivate:[AuthGuard]},
  {path : RoutePaths.Agent, component : AgentComponent, canActivate:[AuthGuard]},
  {path : RoutePaths.Profile, component: ProfileComponent, canActivate:[AuthGuard]},
  {path : RoutePaths.Register, component: RegisterComponent},
  {path : RoutePaths.AddProperty, component: AddPropertyComponent, canActivate:[AuthGuard]},
  {path : `${RoutePaths.Property}/:id`, component: PropertyComponent, canActivate:[AuthGuard]},
  {path : RoutePaths.default, component : RealEstatesComponent},
  {path : RoutePaths.wildcard ,component : ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
