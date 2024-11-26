import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const accessGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.waitForAuthInit().pipe(
    take(1),
    map((initialized: any) => {
      if (initialized && authService.isLogged()) {
        return true;
      }
      router.navigate(['auth/login']);
      return false;
    })
  );
};
