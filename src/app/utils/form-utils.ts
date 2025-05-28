import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";
import { timeout } from "rxjs";


async function sleep(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  })
}

export class FormUtils{

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static numberPattern = '^\\d+$';


  static getTextErrors(errors: ValidationErrors){
    for( const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength } caracteres.`;

        case 'min':
          return `Valor mínimo de ${ errors['min'].min}.`;

        case 'emailTaken':
          return `El correo electronico ya esta en uso`;

        case 'email':
          return `El valor ingresado no es un correo electronico`;

        case 'dateInPast':
          return `La fecha seleccionada no puede ser anterior a la actual`

        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.emailPattern){
            return `El valor ingresado no luce como un correo electronico`
          }
          if(errors['pattern'].requiredPattern === FormUtils.numberPattern){
            return `El valor ingresado no es un número`
          }


          return `Error de patrón contra expresión regular`



          default:
            return `Error de validacion no controlado ${ key }`
      }
    }
    return null;
  }



  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (!! form.controls[fieldName].errors && form.controls[fieldName].touched);
  }

  static getFieldError( form: FormGroup, fieldName: string): string | null {
    if ( ! form.controls[fieldName] ) return null;
    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextErrors(errors);
  }


  static isValidFieldInArray(formArray: FormArray, index: number){
    return(
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray( formArray: FormArray, index: number): string | null {
    if ( formArray.controls.length  === 0 ) return null;
    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextErrors(errors);
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string){
    return( formGroup: AbstractControl) => {

      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null: { passwordsNotEqual: true};
    }
  }

  //validacion asincrona
  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null>{
    console.log('Validando');
    await sleep();

    const formValue =  control.value;
    if( formValue === 'hola@mundo.com'){
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  //validacion sincrona
  static notSinister(control: AbstractControl): ValidationErrors | null{
    const formValue =  control.value;
    if( formValue === 'Sinister'){
      return {
        noSinister: true,
      };
    }
    return null;
  }

  static dateNotInPast(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const today = new Date();
    const inputDate = new Date(control.value);

  // Resetear la hora a 00:00:00 para comparar solo la fecha
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate < today ? { dateInPast: true } : null;
  }



}




//FormUtils.isValidField()
