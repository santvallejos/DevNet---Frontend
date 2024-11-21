import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const accessGuard: CanActivateFn = (route, state) => {
  var isLogged = inject(AuthService).isLogged();
  if (isLogged){ 
    return isLogged
  }
  inject(Router).navigate(['auth/login']);
  return false;
};
