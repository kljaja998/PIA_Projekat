import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Setting } from 'src/app/models/setting';
import { User } from 'src/app/models/user';
import { SettingsService } from 'src/app/services/settings.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  

  rentPercentage: Setting
  buyPercentage: Setting
  rentPercentageString: String
  buyPercentageString: String
  rentControl = new FormControl()
  buyControl = new FormControl()
  unApprovedUsers: User[];

  constructor(private usersService: UsersService, 
    private settingsService: SettingsService,
    private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.usersService.getUnapprovedUsers().subscribe((data:User[])=>{
      console.log(data)
      this.unApprovedUsers = data?data:User[0]
    })
    this.settingsService.getBuyPercentage()
    this.settingsService.getRentPercentage()
    this.settingsService
      .rentPercentage$
      .subscribe(value=>{
        console.log(value)
        this.rentPercentage = value
        this.rentPercentageString = String(this.rentPercentage?.value)
      }
    )
    //this.buyPercentageString = this.buyPercentage.value.toString()
    this.settingsService
      .buyPercentage$
      .subscribe( value =>{
        console.log(value)
        this.buyPercentage = value
        this.buyPercentageString = String(this.buyPercentage?.value)
      }
      )
    //this.rentPercentageString = this.rentPercentage.value.toString()
  }

  approveUser(user:User):void{
    this.usersService.approveUser(user.username).subscribe(res=>{
      if(res["message"]=="ok"){
        alert("User approved!")
        const index = this.unApprovedUsers.indexOf(user)
        if(index>-1){
          this.unApprovedUsers.splice(index,1)
        }
      }
    })
  }
  deleteUser(user:User):void{
    this.usersService.deleteUser(user.username).subscribe(res=>{
      if(res["message"]=="ok"){
        alert("User deleted!")
        const index = this.unApprovedUsers.indexOf(user)
        if(index>-1){
          this.unApprovedUsers.splice(index,1)
        }
      }
    })
  }

  setBuyPercentage(){
    let value = this.buyControl.value
    console.log("setBuyPercentage"+value)
    this.settingsService.setBuyPercentage(Number(value)).subscribe(res=>{
      if(res){
        this.buyPercentage.value = Number(value)
      }
    })
  }
  setRentPercentage(){
    let value = this.rentControl.value
    console.log("setRentPercentage"+value)
    this.settingsService.setRentPercentage(Number(value)).subscribe(res=>{
      if(res){
        this.rentPercentage.value = Number(value)
      } 
    })
  }

}
