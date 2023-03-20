import { AbstractControl, ValidationErrors } from "@angular/forms";

export function file_type_checker(control: AbstractControl): ValidationErrors | null {


    const value = control.value.name;

    if(!value){
        return null;
    }

    let valToLower = value.toLowerCase();
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$"); 
    let regexTest = regex.test(valToLower);

    // console.log(!regexTest ? { "notSupportedFileType": true } : null)        
    return !regexTest ? { "notSupportedFileType": true } : null;


}