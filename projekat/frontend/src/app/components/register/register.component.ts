import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserType } from 'src/app/enums/user-types';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { EmailUniqueValidator } from 'src/app/validators/email-unique.validator';
import { UsernameValidator } from 'src/app/validators/username.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usertype = UserType;

  constructor(private usersService: UsersService,
              private fb: FormBuilder,
              private authService: AuthService) { }

  registerForm = this.fb.group({
    username: ["", {
            validators:[Validators.required],
            asyncValidators:[UsernameValidator.createValidator(this.usersService)],
            updateOn:"blur"
            }],
    password: ["", 
                [Validators.required, Validators.pattern(/^(?!.*(.)\1\1)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/)]
                ],
    email: ["", {
            validators:[Validators.required, Validators.email],
            asyncValidators:[EmailUniqueValidator.createValidator(this.usersService)],
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
  }

  getEmailErrorMessage(){
    return "Email error"
  }

  getPasswordErrorMessage(){
    return "Password error"
  }
}
