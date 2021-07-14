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
    this.authService.checkIsLoggedIn()
    this.authService.loggedin$
        .subscribe(data => {
          this.loggedIn = data;
          if(this.loggedIn){
            this.isAdministrator = this.isAdmin()
            this.isEmployee = this.isAdministrator || this.isAgent()            
          }
        });        
  }


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
