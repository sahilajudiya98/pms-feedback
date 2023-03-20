import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPassword(firstControl:string, secondControl:string): ValidatorFn  {
  return (control: AbstractControl): ValidationErrors | null => {

    const password = control.get(firstControl)?.value;
    const confirm = control.get(secondControl)?.value;

    if (password != confirm) {
      return { 'noMatch': true }
    }
    else{
    return null
  }

  }


}