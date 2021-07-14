import { Component, OnInit } from '@angular/core';
import { RealEstatesService } from 'src/app/services/real-estates.service';
import { RealEstate } from 'src/app/models/real-estate';
import { Router } from '@angular/router';
import { RoutePaths } from 'src/app/enums/route-paths';
import { environment } from 'src/environments/environment';
import { ApiPaths } from 'src/app/enums/api-paths';


@Component({
  selector: 'app-real-estates',
  templateUrl: './real-estates.component.html',
  styleUrls: ['./real-estates.component.css']
})
export class RealEstatesComponent implements OnInit {


  constructor(private realEstateService:RealEstatesService,
              private router: Router) {  }

  realEstates! : RealEstate[];
  icon!:string[];
  assetsLink = `${environment.baseUrl}${ApiPaths.Assets}`

  ngOnInit(): void {
    this.getAllProperty()
    
    //this.icon = ['apartment','house']
  }

  getRandomImageLink(property){
    return `${this.assetsLink}${property.gallery[Math.floor(Math.random()*property.gallery.length)]}`
  }

  goToProperty(id){
    this.router.navigate([RoutePaths.Property,id])
  }

  getAllProperty(){
    this.realEstateService.getAllProperties().subscribe((realEstates)=>{
      this.realEstates=realEstates
      this.realEstates = this.realEstates.map(property=> ({...property, randomImageLink: this.getRandomImageLink(property)}));
    });
  }

  test(){
    let now = Date.now()
    let date = new Date(now)
    console.log(date)
  }

}
