import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { Setting } from '../models/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  baseUrl = environment.baseUrl

  rentPercentage$ = new BehaviorSubject<Setting>(null)
  buyPercentage$ = new BehaviorSubject<Setting>(null)


  constructor(private http: HttpClient) { }

  
  public getRentPercentage() {
      const url = `${this.baseUrl}${ApiPaths.Settings}/getRentPercentage`
      console.log(url)
      this.http.get(url).subscribe((value:Setting)=>{
        this.rentPercentage$.next(value)
      })
    }

  public getBuyPercentage() {
      const url = `${this.baseUrl}${ApiPaths.Settings}/getBuyPercentage`
      this.http.get(url).subscribe((value:Setting)=>{
        this.buyPercentage$.next(value)
      })
  }

  public setBuyPercentage(value): Observable<boolean>{
    const url =  `${this.baseUrl}${ApiPaths.Settings}/setBuyPercentage`
    const data ={
      value: value
    }
    return this.http.post(url,data).pipe(
      tap(response=> {
        if(response["message"]=="success") 
        this.buyPercentage$
        .next({name:"rentPercentage",value:value})
      }),
      map(response=> 
        response["message"]=="success"?true:false
        ),
      catchError(()=> of(false))
    )
  }

  public setRentPercentage(value): Observable<boolean>{
    const url =  `${this.baseUrl}${ApiPaths.Settings}/setRentPercentage`
    const data ={
      value: value
    }
    return this.http.post(url,data).pipe(
      tap(response=> {
        if(response["message"]=="success") 
        this.rentPercentage$
        .next({name:"rentPercentage",value:value})
      }),
      map(response=> 
        response["message"]=="success"?true:false),
      catchError(()=> of(false))
    )
  }
  

}
