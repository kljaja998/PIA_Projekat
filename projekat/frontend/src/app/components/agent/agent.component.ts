import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ApiPaths } from 'src/app/enums/api-paths';
import { RealEstate } from 'src/app/models/real-estate';
import { RealEstatesService } from 'src/app/services/real-estates.service';
import { environment } from 'src/environments/environment';
import { plugins } from 'chart.js'

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private realEstatesService: RealEstatesService) { }

  allProperties:RealEstate[]
  unApprovedProperties:RealEstate[]
  unpromotedProperties:RealEstate[]
  promotedProperties:RealEstate[]
  citiesSet: Set<string>
  assetsLink = `${environment.baseUrl}${ApiPaths.Assets}`
  cityBarChartData : ChartDataSets[] = []
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  ngOnInit(): void {
    console.log(this.cityBarChartData)
    this.realEstatesService.getAllRealEstate().subscribe((res:RealEstate[])=>{
      this.unApprovedProperties = res.filter(value => !value.isApproved)
      res = res.map(property=> ({...property, randomImageLink: this.getRandomImageLink(property)}));
      this.citiesSet = new Set()
      res.forEach(realEstate => {
        this.citiesSet.add(realEstate.city)
      });
      this.cityBarChartData.pop()
      this.citiesSet.forEach(city => {
        console.log(city)
        let prices = res.
          filter(value => value.city==city).
          map(value => value.price)
        console.log(prices)
        this.cityBarChartData.push({data:prices,label:city, })
        console.log(this.cityBarChartData)
      });
      this.unpromotedProperties = res.filter(value => !value.isPromoted && value.isApproved)
      this.promotedProperties = res.filter(value => value.isPromoted && value.isApproved)
    })
  }

  approveProperty(id){
    this.realEstatesService.approveRealEstate(id).subscribe( res =>{
      if(res["message"]=="success"){
        let index = this.unApprovedProperties.findIndex(value=>value._id==id)
        let property = this.unApprovedProperties.splice(index,1)[0]
        this.unpromotedProperties.push(property)
      } else {

      }
    })
  }

  deleteUnapprovedProperty(id){
    this.realEstatesService.deleteRealEstate(id).subscribe(res=>{
      if(res["message"]=="success"){
        let index = this.unApprovedProperties.findIndex(value=>value._id==id)
        let property = this.unApprovedProperties.splice(index,1)[0]
      }
    })
  }

  deleteUnpromotedProperty(id){
    this.realEstatesService.deleteRealEstate(id).subscribe(res=>{
      if(res["message"]=="success"){
        let index = this.unpromotedProperties.findIndex(value=>value._id==id)
        let property = this.unpromotedProperties.splice(index,1)[0]
      }
    })
  }

  deletePromotedProperty(id){
    this.realEstatesService.deleteRealEstate(id).subscribe(res=>{
      if(res["message"]=="success"){
        let index = this.promotedProperties.findIndex(value=>value._id==id)
        let property = this.promotedProperties.splice(index,1)[0]
      }
    })
  }

  promoteProperty(id){
    this.realEstatesService.promoteRealEstate(id).subscribe(res=>{
      if(res["message"]=="success"){
        let index = this.unpromotedProperties.findIndex(value=>value._id==id)
        let property = this.unpromotedProperties.splice(index,1)[0]
        this.promotedProperties.push(property)
      }
    })
  }

  unpromoteProperty(id){
    this.realEstatesService.unpromoteRealEstate(id).subscribe(res=>{
      if(res["message"]=="success"){
        let index = this.promotedProperties.findIndex(value=>value._id==id)
        let property = this.promotedProperties.splice(index,1)[0]
        this.unpromotedProperties.push(property)
      }
    })
  }


  getRandomImageLink(property){
    return `${this.assetsLink}${property.gallery[Math.floor(Math.random()*property.gallery.length)]}`
  }

}
