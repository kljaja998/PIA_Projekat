import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"



export class PropertyMediaValidator{
    static createValidator():ValidatorFn{
        return(control: AbstractControl): ValidationErrors =>{
            let value = control.value as FileList          
            return (value?.length>=3) ? null : {propertyMinAmmount:true}
        }
    }
}