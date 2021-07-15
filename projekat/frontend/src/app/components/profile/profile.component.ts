import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor
    ( private usersService:UsersService,
      private fb:FormBuilder,
      private authService:AuthService) { }

  user:User
  firstNameControl = new FormControl()
  lastNameControl = new FormControl()
  cityControl = new FormControl()
  countryControl = new FormControl()

  ngOnInit(): void {
    this.authService.user$.subscribe(value=>this.user=value)
  }

  editFirstName(){
    let value = this.firstNameControl.value
    this.usersService.editFirstName(this.user.username,value).subscribe(res=>{
      if(res["message"]=="success"){
        this.user.firstname=value
      }else{
        console.log("fail")
      }
    })
  }
  editLastName(){
    let value = this.lastNameControl.value
    this.usersService.editLastName(this.user.username,value).subscribe(res=>{
      if(res["message"]=="success"){
        this.user.lastname=value
      } else{
        console.log("fail")
      }
    })
  }
  editCity(){
    let value = this.cityControl.value
    this.usersService.editCity(this.user.username,value).subscribe(res=>{
      if(res["message"]=="success"){
        this.user.city=value
      }else{
        console.log("fail")
      }
    })
  }
  editCountry(){
    let value = this.countryControl.value
    this.usersService.editCountry(this.user.username,value).subscribe(res=>{
      if(res["message"]=="success"){
        this.user.country=value
      }else{
        console.log("fail")
      }
    })
  }

}
