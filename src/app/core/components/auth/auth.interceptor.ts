import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // translate tillari uchun uz.json/ru.json/en.json
  if (['.json'].find(w => req.url.endsWith(w))) {
    return next(req);
  }

  const authService = inject(AuthService);

  const token = authService.accessToken;

  if (token) {
    const AUTHORIZATION = 'Authorization';
    const BEARER_TOKEN = `Bearer ${token}`;

    const cloned = req.clone({
      headers: req.headers.set(AUTHORIZATION, BEARER_TOKEN),
    });

    return next(cloned);
  }

  return next(req);
};
