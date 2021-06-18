import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  loggedin$ = new BehaviorSubject(false);
  //loggedin$ = this.loggedin.asObservable();

  user$ = new BehaviorSubject(null);
  //user$ = this.user.asObservable();

  constructor(private http: HttpClient) { }

  checkIsLoggedIn(){
    //console.log("check is logged in")
    let loggedin = JSON.parse(localStorage.getItem("loggedin"));
    //console.log(loggedin)
    if(loggedin){
      this.loggedin$.next(true);
      this.user$.next(JSON.parse(localStorage.getItem("user")));
    }
    //console.log(this.user$.value)
  }

  login(username, password){
    /*console.log("username:"+username)
    console.log("password:"+password)*/

    const data = {
      username: username,
      password: password
    }
    //console.log("login called with data: "+ data)

    const url = `${this.baseUrl}${ApiPaths.Auth}/login`
    
    //let userData;
    this.http.post(url,data).subscribe((user:User)=>{
      if(user){
        this.user$.next(user);
        this.loggedin$.next(true);
        localStorage.setItem("loggedin","true");
        localStorage.setItem("user",JSON.stringify(user));
    }});    
    

    //return this.http.post(url, data);
  }

  logout(){
    localStorage.removeItem("user")
    localStorage.setItem("loggedin","false");
    this.loggedin$.next(false);
    this.user$.next(null);
  }

  isAdmin():boolean{
    console.log("isAdmin")
    //console.log(this.user$.value)
    if(this.user$.value?.type == "Admin"){
      console.log("isAdmintrue")
      return true;
    } else {
      console.log("isAdminfalse")
      return false;
    }
  }

  isAgent():boolean{
    console.log("isAgent")
    if(this.user$.value?.type == "Agent"){
      return true;
    } else {
      return false;
    }
  }
}
