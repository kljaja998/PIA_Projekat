import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserType } from 'src/app/enums/userTypes';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { EmailUniqueValidator } from 'src/app/validators/email-unique-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usertype = UserType;

  constructor(private usersService: UsersService, private fb: FormBuilder, private authService: AuthService) { }

  registerForm = this.fb.group({
    username: ["", {
            validators:[Validators.required],
            asyncValidators:[],
            updateOn:"blur"
            }],
    password: ["", 
                [Validators.required, Validators.pattern(/^(?!.*(.)\1\1)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/)]
                ],
    email: ["", {
            validators:[Validators.required, Validators.email],
            asyncValidators:EmailUniqueValidator.createValidator(this.usersService),
            updateOn:"blur"
          }],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    city: ["", Validators.required],
    country: ["", Validators.required],
    type: [UserType.User, Validators.required],
    profilePicture: [null]
  })

  onFileSelect(event){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.registerForm.controls.profilePicture.setValue(file);
    }
  }

  /*data = {
    username : "",
    password : "",
    firstname: "",
    lastname: "",
    email: "",
    type: "",
    city: "",
    country: "",
    profile_picutre:"",
    approved:false,
    properties:[]
  }
  errors = {
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    city: String,
    country: String
  }*/
  


  ngOnInit(): void {
  }

  logPicture(){
    console.log(this.registerForm.controls.profilePicture)
  }




  register(){
    console.log("Register!")
    const formData = new FormData();
    formData.append(
      "profilePicture", 
      this.registerForm.controls.profilePicture.value
      )
    formData.append(
      "username",
      this.registerForm.controls.username.value
    )
    formData.append(
      "email",
      this.registerForm.controls.email.value
    )
    formData.append(
      "password",
      this.registerForm.controls.password.value
    )
    formData.append(
      "firstName",
      this.registerForm.controls.firstName.value
    )
    formData.append(
      "lastName",
      this.registerForm.controls.lastName.value
    )
    formData.append(
      "city",
      this.registerForm.controls.city.value
    )
    formData.append(
      "country",
      this.registerForm.controls.country.value
    )
    formData.append(
      "type",
      this.registerForm.controls.type.value
    )
    if(this.authService.isAdmin()){
      formData.append(
        "approved",
        "true"
      )
    } else {
      formData.append(
        "approved",
        "false"
      )
    }
    this.usersService.registerUser(formData).subscribe(res =>{
      if(res["message"]=="success")
        console.log("Registration a success!")
    })


    /*console.log("Registered!")
    this.data.username="test"
    this.data.password="Testing123*"
    this.data.firstname="Tester"
    this.data.lastname="Testerovic"
    this.data.email="test@gmail.com"
    this.data.city="Podgorica"
    this.data.country="Crna Gora"
    this.data.type="User"
    console.log(this.data)
    this.usersService.registerUser(this.data).subscribe(res=>{
      if(res["message"]=="success"){
        alert("success!");
      }else{
        if(res["errors"]["username"]==true){
          console.log("username in use")
        } 
        if(res["errors"]["email"]==true){
          console.log("email in use")
        }
      }
      console.log(res)
    }/*,err => {
      console.log(err)
      if(err.error.email)
        console.log("email in use")
      if(err.error.username)
        console.log("username in use")
    })*/
  }

  getEmailErrorMessage(){
    return "Email error"
  }

  getPasswordErrorMessage(){
    return "Password error"
  }
}
