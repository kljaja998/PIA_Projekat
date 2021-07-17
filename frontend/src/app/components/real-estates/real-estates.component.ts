import { Component, OnInit } from '@angular/core';
import { RealEstatesService } from 'src/app/services/real-estates.service';
import { RealEstate } from 'src/app/models/real-estate';
import { Router } from '@angular/router';
import { RoutePaths } from 'src/app/enums/route-paths';
import { environment } from 'src/environments/environment';
import { ApiPaths } from 'src/app/enums/api-paths';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-real-estates',
  templateUrl: './real-estates.component.html',
  styleUrls: ['./real-estates.component.css']
})
export class RealEstatesComponent implements OnInit {


  constructor(private realEstateService:RealEstatesService,
              private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) {  }

  searchForm = this.fb.group({
    city: [""],
    minPrice: [""],
    maxPrice: [""]
  },
  )
  realEstates! : RealEstate[];
  unpromotedRealEstates: RealEstate[]
  promotedRealEstates: RealEstate[]
  icon!:string[];
  searchedRealEstates : RealEstate[]
  /*cityCheckString: string
  minPriceString: string
  maxPriceString: string*/
  citiesSet: Set<String>

  assetsLink = `${environment.baseUrl}${ApiPaths.Assets}`

  ngOnInit(): void {
    this.getAllProperty()
  }

  getRandomImageLink(property){
    return `${this.assetsLink}${property.gallery[Math.floor(Math.random()*property.gallery.length)]}`
  }

  goToProperty(id){
    this.router.navigate([RoutePaths.Property,id])
  }

  getAllProperty(){
    this.realEstateService.getAllRealEstate().subscribe((realEstates)=>{
      this.realEstates=realEstates
      this.realEstates = this.realEstates.map(property=> ({...property, randomImageLink: this.getRandomImageLink(property)}));
      this.unpromotedRealEstates = this.realEstates.filter(property=>!property.isPromoted)
      this.promotedRealEstates = this.realEstates.filter(property=>property.isPromoted)
      this.citiesSet = new Set()
      this.realEstates.forEach(realEstate => {
        this.citiesSet.add(realEstate.city)
      });
    });
  }

  isAdmin(){
    return this.authService.isAdmin()
  }

  isLoggedIn(){
    return this.authService.loggedin$.value
  }
  

  search(){
    /*console.log(this.searchForm.controls.city.value)
    console.log(this.searchForm.controls.city.value === "" || 
    this.searchForm.controls.city.value === "Beograd")
    console.log(this.searchForm.controls.minPrice.value)
    console.log(this.searchForm.controls.minPrice.value === "" || 
    Number(this.searchForm.controls.minPrice.value) < 195000)
    console.log(this.searchForm.controls.maxPrice.value)
    console.log(this.searchForm.controls.maxPrice.value === "" || 
    Number(this.searchForm.controls.maxPrice.value) > 195000)
    this.realEstates.forEach(element => {
      console.log(element.city)
      console.log(element.price)
    });*/
    this.searchedRealEstates = this.unpromotedRealEstates.filter(realEstate=>
      (this.searchForm.controls.city.value === "" || 
        this.searchForm.controls.city.value === realEstate.city) &&
      (this.searchForm.controls.minPrice.value === "" || 
         Number(this.searchForm.controls.minPrice.value) < realEstate.price) &&
      (this.searchForm.controls.maxPrice.value === "" || 
        Number(this.searchForm.controls.maxPrice.value) > realEstate.price)
    )
    console.log(this.searchedRealEstates)
  }

}
