import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPaths } from 'src/app/enums/api-paths';
import { RealEstate } from 'src/app/models/real-estate';
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
              private realEstateService: RealEstatesService) { }

  
  property: RealEstate
  uri = `${environment.baseUrl}${ApiPaths.Assets}`  
  ngOnInit(): void {
    try {
      this.property = this.realEstateService.getPropertyById(this.route.snapshot.paramMap.get("id"));
    } catch {
      this.realEstateService.getAllProperties().toPromise().then(()=>{
        this.property = this.realEstateService.getPropertyById(this.route.snapshot.paramMap.get("id"));
      })
    }

  }

  getName(){
    return this.property.name
  }

  

}
