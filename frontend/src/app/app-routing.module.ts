import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AgentComponent } from './components/agent/agent.component';
import { LoginComponent } from './components/login/login.component';
import { RealEstatesComponent } from './components/real-estates/real-estates.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminComponent},
  {path:"agent",component:AgentComponent},
  {path:"",component:RealEstatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
