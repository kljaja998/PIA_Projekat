import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import {skip} from "rxjs/operators"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormControl = new FormControl('');

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.wrongPasswordFormat = false
    this.wrongLogin = false
  }


  pattern= RegExp(/^(?!.*(.)\1\1)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/);
  username : string;
  password : string;
  wrongPasswordFormat:Boolean;
  wrongLogin:Boolean;

  login(){
    /*console.log(this.username)
    console.log(this.password)
    console.log(this.pattern);
    console.log(this.pattern.test(this.password))*/

    
    if(!this.pattern.test(this.password)){
      //TODO: some other kind of error?
      console.log("wrong format")
      this.wrongPasswordFormat = true;
    } else{
      console.log("sent")
      this.authService.login(this.username,this.password)
      let loginSubscription = this.authService.loggedin$.pipe(skip(1)).subscribe(data=>{
        console.log("login subscription pinged")
        if(data){
          this.router.navigate([""])
          loginSubscription.unsubscribe()
        } else{
          this.wrongLogin = true;
          console.log("Login failed")
          loginSubscription.unsubscribe()
        }
      })
    }

    
  }

}
