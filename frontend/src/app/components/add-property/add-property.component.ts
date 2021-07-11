import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Furnished } from 'src/app/enums/furnished';
import { PropertyCategories } from 'src/app/enums/property-categories';
import { Sale } from 'src/app/enums/sale';
import { UserType } from 'src/app/enums/user-types';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

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
              private authService: AuthService) { }

  addPropertyForm = this.fb.group({
    name:[""],
    city:[""],
    municipality:[""],
    street:[""],
    street_no:[""],
    category:[PropertyCategories.Appartment],
    area:[""],
    floor:[""],
    room_no:[""],
    furnished:[Furnished.Unfurnished],
    sale:[Sale.Sale],
    price:[""],
    media:[null]
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
    
  }

}
