import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }



  registerUser(data){
    const url = `${this.baseUrl}${ApiPaths.User}/registerUser`
    return this.http.post(url, data)
  }

  addUser(data){
    const url = `${this.baseUrl}${ApiPaths.User}/addUser`
    return this.http.post(url, data)
  }

  getUnapprovedUsers(){

    const url = `${this.baseUrl}${ApiPaths.User}/getUnapprovedUsers`
    return this.http.get(url)
  }
  getApprovedUsers(){

    const url = `${this.baseUrl}${ApiPaths.User}/getApprovedUsers`
    return this.http.get(url)
  }

  approveUser(username){
    let data={
      username:username
    }
    const url = `${this.baseUrl}${ApiPaths.User}/approveUser`
    return this.http.post(url, data)
  }
  deleteUser(username){
    let data={
      username:username
    }
    const url = `${this.baseUrl}${ApiPaths.User}/deleteUser`
    return this.http.post(url, data)
  }



  checkEmail(email:string){
    const data={
      email:email
    }
    const url = `${this.baseUrl}${ApiPaths.User}/checkEmail`
    return this.http.post(url,data).pipe(
      map((result)=>result["message"]=="email ok"?true:false)
    )
  }

  checkUsername(username:string){
    const data={
      username:username
    }
    const url = `${this.baseUrl}${ApiPaths.User}/checkUsername`
    return this.http.post(url,data).pipe(
      map((result)=>result["message"]=="username ok"?true:false)
    )
  }

}
