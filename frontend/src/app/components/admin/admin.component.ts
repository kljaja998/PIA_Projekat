import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  unApprovedUsers: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUnapprovedUsers().subscribe((data:User[])=>{
      console.log(data)
      this.unApprovedUsers = data
    })
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

}
