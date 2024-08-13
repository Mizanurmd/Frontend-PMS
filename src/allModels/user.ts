import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { AuthServiceService } from "../allServices/auth-service.service";
import { catchError, map, of } from "rxjs";

export interface User {
  id?: number;
  name?: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  
}

export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
}

// ======usernameValidator function here===============
export function usernameValidator(authServ: AuthServiceService): AsyncValidatorFn {
  return (control: AbstractControl): any => {
    return authServ.checkUsernameExists(control.value).pipe(
      map(isTaken => (isTaken ? { usernameTaken: true } : null)),
      catchError(() => of(null))
    );
  };
}