import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.wrongPasswordFormat = false
  }


  pattern= RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/);
  username : string;
  password : string;
  wrongPasswordFormat:Boolean;

  login(){
    /*console.log(this.username)
    console.log(this.password)
    console.log(this.pattern);
    console.log(this.pattern.test(this.password))*/

    
    if(!this.pattern.test(this.password)){
      //TODO: some other kind of error?
        this.wrongPasswordFormat = true;
    } else{
      console.log("sent")
      this.authService.login(this.username,this.password)
      this.authService.loggedin$.subscribe(data=>{
        if(data)
          this.router.navigate([""])
      })
    }

    
  }

}
