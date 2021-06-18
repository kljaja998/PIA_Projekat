import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RoutePaths } from '../enums/route-paths';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AgentGuard implements CanActivate {
    constructor(private router: Router, authService: AuthService) { 
        this.authService = authService
    }
    authService: AuthService
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //console.log("Admin guard can activate")
        //let user = this.authService.user$.value;*/
        if (this.authService.isAdmin()){
            return true;
        } else{
            this.router.navigate([RoutePaths.Error])
            return false;
        }
    }
}