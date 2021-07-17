import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { RealEstate } from '../models/real-estate';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RealEstatesService {

  constructor(private http: HttpClient) { }

  realEstates:RealEstate[]

  uri=`${environment.baseUrl}${ApiPaths.RealEstates}`

  /*getAllProperties(){
    const allProperties: RealEstate[] = [
      {type : 0, name : "Trosobni stan", address : "Beograd", price : 134000},
      {type : 1, name : "Kuca sa dvoristem", address : "Novi sad", price : 84000},
      {type : 0, name : "Garsonjera", address:"Nis", price:38000}
    ]
    return allProperties;
  }*/
  getAllRealEstate(){
    const url = `${this.uri}/getAllRealEstate`
    return this.http.get(url).pipe(
      tap((response:RealEstate[])=>{
        this.realEstates = response
      }),
      catchError(err=>of(err))
    )
  }

  addRealEstate(data){
    const url = `${this.uri}/addRealEstate`
    return this.http.post(url,data)
  }

  getPropertyById(id){
    console.log("getPropertyById:",id)
    return this.realEstates.find(x => x._id == id)
  }

  getUnapprovedRealEstate(){
    const url = `${this.uri}/getUnapprovedRealEstate`
    return this.http.get(url)
  }

  getApprovedRealEstate(){
    const url = `${this.uri}/getApprovedRealEstate`
    return this.http.get(url)
  }

  approveRealEstate(id){
    const data ={
      id:id
    }
    const url = `${this.uri}/approveRealEstate`
    return this.http.post(url,data)
  }

  promoteRealEstate(id){
    const data ={
      id:id
    }
    const url = `${this.uri}/promoteRealEstate`
    return this.http.post(url,data)
  }

  unpromoteRealEstate(id){
    const data ={
      id:id
    }
    const url = `${this.uri}/unpromoteRealEstate`
    return this.http.post(url,data)
  }

  deleteRealEstate(id){
    const data ={
      id:id
    }
    const url = `${this.uri}/deleteRealEstate`
    return this.http.post(url,data)
  }
  
  incrementViews(id){
    const data ={
      id:id
    }
    const url = `${this.uri}/incrementViews`
    return this.http.post(url,data)
  }
}
