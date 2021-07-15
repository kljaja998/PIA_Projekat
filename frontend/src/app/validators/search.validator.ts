import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"
import { Observable } from "rxjs"

export class SearchGroupValidator{
    static createValidator():ValidatorFn{
        return(group: FormGroup): ValidationErrors =>{
            const city = group.controls.city.value
            const minPrice = group.controls.minPrice.value
            const maxPrice = group.controls.maxPrice.value
            if(city != "" || minPrice != "" || maxPrice != "")
                return null
            else
                return {noParameters:true}
            
        }
    }
}