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
  _id: String;
  name: String;
  city: String;
  municipality: String;
  street: String;
  street_no: String;
  category: PropertyCategories;
  area: Number;
  floor: String;
  room_no: String;
  furnished: Furnished;
  gallery: [String];
  sale: Sale;
  price: Number;
  owner: String;
}