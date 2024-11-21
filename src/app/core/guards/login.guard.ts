import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  var isLogged = inject(AuthService).isLogged();
  if (isLogged){
    inject(Router).navigate(['pages/home']);
    return false;
  }
  return true;
};
