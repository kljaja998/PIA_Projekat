import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../models/real-estate';
import { RealEstatesService } from '../real-estates.service';


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
