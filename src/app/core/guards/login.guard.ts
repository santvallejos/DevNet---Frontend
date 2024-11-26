import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map, take } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.waitForAuthInit().pipe(
    take(1),
    map((initialized: any) => {
      if (initialized && authService.isLogged()) {
        router.navigate(['pages/home']);
        return false;
      }
      return true;
    })
  );
}