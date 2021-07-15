import { Furnished } from "../enums/furnished";
import { PropertyCategories } from "../enums/property-categories";
import { Sale } from "../enums/sale";

/*export interface RealEstate{
  type: number;
  name: string;
  address: string;
  price: number;
}*/
export interface RealEstate{
  _id: string;
  name: string;
  city: string;
  municipality: string;
  street: string;
  street_no: string;
  category: PropertyCategories;
  area: number;
  floor: string;
  room_no: string;
  furnished: Furnished;
  gallery: [string];
  sale: Sale;
  price: number;
  owner: string;
  isApproved: boolean;
  isPromoted: boolean;
}