import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }



  registerUser(user){
    const url = `${this.baseUrl}${ApiPaths.User}/register`
    return this.http.post(url, user)
  }

  addUser(user){
    const url = `${this.baseUrl}${ApiPaths.User}/addUser`
    return this.http.post(url, user)
  }

}
