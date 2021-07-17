import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPaths } from 'src/app/enums/api-paths';
import { RealEstate } from 'src/app/models/real-estate';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OffersService } from 'src/app/services/offers.service';
import { RealEstatesService } from 'src/app/services/real-estates.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private router:Router,
              private realEstateService: RealEstatesService,
              private offersService: OffersService,
              private authService: AuthService) { }

  

  user:User
  ammount: string
  property: RealEstate
  uri = `${environment.baseUrl}${ApiPaths.Assets}`  
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id")
    try {
      this.property = this.realEstateService.getPropertyById(id);
    } catch {
      this.realEstateService.getAllRealEstate().toPromise().then(()=>{
        this.property = this.realEstateService.getPropertyById(id);
        //console.log(this.property)
      })
    }
    this.authService.user$.subscribe(value=>this.user=value)
    let visited = JSON.parse(localStorage.getItem("visited"))
    console.log("visited: ",visited)
    if(visited == null){
      visited = []
      visited.push(id)
      console.log("incrementViews:",id)
      this.realEstateService.incrementViews(id)
      localStorage.setItem("visited",JSON.stringify(visited))
    } else {
      if(!(visited.includes(id))){
        visited.push(id)
        console.log("incrementViews:",id)
        this.realEstateService.incrementViews(id)
        localStorage.setItem("visited",JSON.stringify(visited))
      }
    }

  }

  getName(){
    return this.property.name
  }

  isOwner(){
    console.log(this.property.owner)
    return (this.property.owner == "agencija" && 
            (this.authService.isAdmin() || this.authService.isAgent())) ||
            (this.property.owner == this.user.username)
  }

  sendOffer(){
    this.offersService
      .sendOffer(
        this.user.username,
        this.property._id,
        this.property.owner,
        this.ammount)
      .subscribe(
        res=>{
          if(res["message"]=="success"){
            console.log("success")
          }
        }
      )
  }

}
