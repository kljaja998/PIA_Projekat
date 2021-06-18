import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePaths } from './enums/route-paths';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PIA-Projekat-Frontend';
  loggedIn=false;
  isAdministrator=false;
  isEmployee=false;

  constructor(private authService: AuthService,
    private router: Router){}
  
  ngOnInit(){
    //console.log("app component ngonInit")
    this.authService.checkIsLoggedIn()
    this.authService.loggedin$
        .subscribe(data => {
          this.loggedIn = data;
          this.isAdministrator = this.isAdmin()
          this.isEmployee = this.isAdministrator || this.isAgent()
          /*if(this.loggedIn)
            this.loginroute();
          /*else
            this.router.navigate([RoutePaths.default]);*/
        });        
  }


  /*loginroute(){
    //console.log("loginroute")
    //console.log(this.authService.user$.value)
    //console.log("ispred if")
    if(this.authService.isAdmin()){
      //console.log("prvi then")
      this.router.navigate([RoutePaths.Admin])
      //console.log("odosmo na admin?")
    } else if (this.authService.isAgent()) {
      //console.log("drugi then")
      this.router.navigate([RoutePaths.Agent])
    } else {
      //console.log("else")
      this.router.navigate([RoutePaths.default])
    }
    //console.log("loginroute end")
  }*/

  isAdmin(){
    return this.authService.isAdmin();
  }

  isAgent(){
    return this.authService.isAgent();
  }

  logout(){
    return this.authService.logout();
  }
}
