import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RealEstatesComponent } from './components/real-estates/real-estates.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:RealEstatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
