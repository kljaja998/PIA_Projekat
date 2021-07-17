import { Component, OnInit } from '@angular/core';
import { OfferStatus } from 'src/app/enums/offer-status';
import { Offer } from 'src/app/models/offer';
import { AuthService } from 'src/app/services/auth.service';
import { OffersService } from 'src/app/services/offers.service';
import { RealEstatesService } from 'src/app/services/real-estates.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(
    private offersService : OffersService,
    private realEstatesService : RealEstatesService,
    private authService : AuthService
  ) { }

  myOffers:Offer[]
  offersForMe:Offer[]
  agencija:boolean
  slike = new Map([
    [OfferStatus.Accepted,'price_check'],
    [OfferStatus.Pending,'pending'],
    [OfferStatus.Rejected,'thumb_down']
  ])

  ngOnInit(): void {
    let username = this.authService.getLoggedInUsername()
    this.agencija = this.authService.isAdmin() || this.authService.isAgent()
    if(this.agencija){
      this.offersService.
        getOffersByUser('agencija').
        subscribe((values:Offer[])=>{
            this.myOffers = values
          })
      this.offersService.
        getOffersForOwner('agencija').
        subscribe((values:Offer[])=>{
          this.offersForMe = values
        })
    } else{
      this.offersService.
        getOffersByUser(
          username
          ).subscribe((values:Offer[])=>{
            this.myOffers = values
          })
      this.offersService.
        getOffersForOwner(username).
        subscribe((values:Offer[])=>{
          this.offersForMe = values
        })
      }
      
  }

  getPropertyName(id){
    return this.realEstatesService.getPropertyById(id).name
  }

  acceptOffer(id, property_id){
    this.
      offersService.
      acceptOffer(id, property_id).
      subscribe( res => {
        if(res["message"]=="success"){
          /*let index = this.offersForMe.findIndex(value=>value._id==id)
          this.offersForMe.splice(index,1)*/
          this.offersForMe.forEach(element => {
              if (element._id == id)
                element.status = OfferStatus.Accepted
              else if (element.property_id == property_id)
                element.status = OfferStatus.Rejected
          });
        }
      })
  }

  rejectOffer(id){
    this.
      offersService.
      rejectOffer(id).
      subscribe( res => {
        if(res["message"]=="success"){
          /*let index = this.offersForMe.findIndex(value=>value._id==id)
          this.offersForMe.splice(index,1)*/
          this.offersForMe.forEach(element => {
            if (element._id == id)
              element.status = OfferStatus.Rejected
          });
        }
      })
  }

}
