import { Component, OnInit } from '@angular/core';
import { RealEstatesService } from 'src/app/services/real-estates.service';
import { RealEstate } from 'src/app/models/real-estate';


@Component({
  selector: 'app-real-estates',
  templateUrl: './real-estates.component.html',
  styleUrls: ['./real-estates.component.css']
})
export class RealEstatesComponent implements OnInit {


  constructor(private realEstateService:RealEstatesService) {  }

  realEstates! : RealEstate[];
  icon!:string[];

  ngOnInit(): void {
    this.realEstates = this.realEstateService.getAllProperties();
    this.icon = ['apartment','house']
  }

}
