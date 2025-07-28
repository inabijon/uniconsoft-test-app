import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { AuthUtils } from '../utils/auth.utils';
import { RoleEnum } from './role.enum';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.userRole == RoleEnum.ADMIN) {
    return true;
  }

  router.navigate(['/auth/admin/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
