import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Furnished } from 'src/app/enums/furnished';
import { PropertyCategories } from 'src/app/enums/property-categories';
import { Sale } from 'src/app/enums/sale';
import { UserType } from 'src/app/enums/user-types';
import { AuthService } from 'src/app/services/auth.service';
import { RealEstatesService } from 'src/app/services/real-estates.service';
import { UsersService } from 'src/app/services/users.service';
import { PropertyMediaValidator } from 'src/app/validators/property-media.validator';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  propertyCategory=PropertyCategories
  furnished=Furnished
  sale=Sale
  date = new Date()

  constructor(private usersService: UsersService,
              private fb: FormBuilder,
              private authService: AuthService,
              private realEstateService: RealEstatesService,
              private router: Router) { }

  addPropertyForm = this.fb.group({
    name:["",Validators.required],
    city:["",Validators.required],
    municipality:["",Validators.required],
    street:["",Validators.required],
    street_no:["",Validators.required],
    category:[PropertyCategories.Appartment],
    area:["", [Validators.min(0),Validators.pattern("^[0-9]*$"),Validators.required]],
    floor:["",Validators.required],
    room_no:["",Validators.required],
    furnished:[Furnished.Unfurnished],
    sale:[Sale.Sale],
    price:["", [Validators.min(0),Validators.pattern("^[0-9]*$")]],
    media:[null, PropertyMediaValidator.createValidator()]
  })

  ngOnInit(): void {
  }

  onFilesSelected(event){
    if(event.target.files.length>0){
      const files = event.target.files;
      //console.log(files)
      this.addPropertyForm.controls.media.setValue(files);
    }
  }
  
  addProperty(){
    const formData = new FormData();
    Array.from(this.addPropertyForm.controls.media.value).forEach((element:File) => {
      formData.append(
        "media",
        element
      )
    });
    formData.append(
      "name",
      this.addPropertyForm.controls.name.value
    )
    formData.append(
      "city",
      this.addPropertyForm.controls.city.value
    )
    formData.append(
      "municipality",
      this.addPropertyForm.controls.municipality.value
    )
    formData.append(
      "street",
      this.addPropertyForm.controls.street.value
    )
    formData.append(
      "street_no",
      this.addPropertyForm.controls.street_no.value
    )
    formData.append(
      "category",
      this.addPropertyForm.controls.category.value
    )
    formData.append(
      "area",
      this.addPropertyForm.controls.area.value
    )
    formData.append(
      "floor",
      this.addPropertyForm.controls.floor.value
    )
    formData.append(
      "room_no",
      this.addPropertyForm.controls.room_no.value
    )
    formData.append(
      "furnished",
      this.addPropertyForm.controls.furnished.value
    )
      formData.append(
      "sale",
      this.addPropertyForm.controls.sale.value
    )
    formData.append(
      "price",
      this.addPropertyForm.controls.price.value
    )
    formData.append(
      "isApproved",
      (this.authService.isAdmin || this.authService.isAgent) ? "true" : "false"
    )
    formData.append(
      "owner",
      (this.authService.isAdmin || this.authService.isAgent) ? "agencija" : this.authService.getLoggedInUsername()
    )
    this.realEstateService.addRealEstate(formData).subscribe(res=>{
      if(res["message"]=="success")
        this.router.navigate([""])
    })
  }

}
