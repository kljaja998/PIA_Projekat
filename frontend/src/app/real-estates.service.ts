import { Injectable } from '@angular/core';
import { RealEstate } from './models/real-estate';


@Injectable({
  providedIn: 'root'
})
export class RealEstatesService {

  constructor() { }

  getAllProperties():RealEstate[]{
    const allProperties: RealEstate[] = [
      {type : 0, name : "Trosobni stan", address : "Beograd", price : 134000},
      {type : 1, name : "Kuca sa dvoristem", address : "Novi sad", price : 84000},
      {type : 0, name : "Garsonjera", address:"Nis", price:38000}
    ]
    return allProperties;
  }
}
