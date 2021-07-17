import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http:HttpClient) { }

  uri = `${environment.baseUrl}${ApiPaths.Offers}`

  sendOffer(user,property_id,owner,ammount){
    const data = {
      user:user,
      property_id:property_id,
      owner:owner,
      ammount:ammount
    }
    const url = `${this.uri}/sendOffer`
    return this.http.post(url,data)
  }

  getOffersForProperty(property_id){
    const data = {
      property_id:property_id
    }
    const url = `${this.uri}/getOffersForProperty`
    return this.http.post(url,data)
  }

  getOffersForOwner(owner){
    const data = {
      owner:owner
    }
    const url = `${this.uri}/getOffersForOwner`
    return this.http.post(url,data)
  }

  getOffersByUser(user){
    const data = {
      user:user
    }
    const url = `${this.uri}/getOffersByUser`
    return this.http.post(url,data)
  }

  acceptOffer(id,property_id){
    const data={
      id:id,
      property_id:property_id
    }
    const url = `${this.uri}/acceptOffer`
    return this.http.post(url,data)
  }

  rejectOffer(id){
    const data={
      id:id
    }
    const url = `${this.uri}/rejectOffer`
    return this.http.post(url,data)
  }


}
