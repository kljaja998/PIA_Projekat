import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {}


  pattern= RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$");
  username : string;
  password : string;
  wrongPassword:Boolean;

  login(){
    console.log(this.username)
    console.log(this.password)
    console.log(this.pattern);
    console.log(this.pattern.test(this.password))

    //FIXME- Why no pattern work???
    if(this.pattern.test(this.password)){
      
    } else{
      console.log("sent")
      this.authService.login(this.username, this.password)
        .subscribe((user:User) => {
          console.log(user)
          if(user){
            localStorage.setItem("loggedin",JSON.stringify(user))
            if(user.type=="Admin"){
              this.router.navigate(["admin"])
            } else if (user.type=="Agent") {
              this.router.navigate(["agent"])
            } else {
              this.router.navigate([""])
            }
          }
        });
    }

    
  }

}
