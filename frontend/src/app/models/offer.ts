import { OfferStatus } from "../enums/offer-status";


export interface Offer{
    _id:string,
    user:string,
    property_id:string,
    owner:string,
    ammount:Number,
    status:OfferStatus
}