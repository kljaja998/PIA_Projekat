import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UsersService } from "../services/users.service";

export class UsernameValidator{
    static createValidator(usersService:UsersService):AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors> =>{
            return usersService.checkUsername(control.value).pipe(
                map((result:boolean) => result ? null: {usernameUsed:true})
            )
        }
    }
}