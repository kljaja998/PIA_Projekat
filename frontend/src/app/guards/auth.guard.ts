import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RoutePaths } from '../enums/route-paths';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, authService: AuthService) { 
        this.authService = authService
    }
    authService: AuthService
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //console.log("Admin guard can activate")
        //let user = this.authService.user$.value;*/
        //console.log(route.url)
        switch(route.url[0].path){
            case RoutePaths.Admin:{
                if (this.authService.isAdmin()){
                    return true;
                } else{
                    this.router.navigate([RoutePaths.Error])
                    return false;
                }
            }
            case RoutePaths.Agent:{
                if (this.authService.isAdmin() || this.authService.isAgent()){
                    return true;
                } else{
                    this.router.navigate([RoutePaths.Error])
                    return false;
                }
            }
            case RoutePaths.Profile:{
                if(this.authService.loggedin$.value){
                    return true
                } else{
                    this.router.navigate([RoutePaths.Error])
                    return false
                }
            }
            case RoutePaths.Login:{
                if(!this.authService.loggedin$.value){
                    return true
                } else{
                    this.router.navigate([RoutePaths.default])
                    return false
                }
            }
            default:
                return true;

        }

        
    }
}