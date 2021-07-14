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
  getAllProperties(){
    const url = `${this.uri}/getAllRealEstate`
    return this.http.get(url).pipe(
      tap((response:RealEstate[])=>{
        this.realEstates = response
      }),
      catchError(err=>of(err))
    )
  }
  getPropertyById(id){
    return this.realEstates.find(x => x._id == id)
  }

  
}
