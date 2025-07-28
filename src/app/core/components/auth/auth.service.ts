import { inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService } from 'primeng/api';
import { RoleEnum } from './role.enum';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;
  private _authenticated$: ReplaySubject<boolean> = new ReplaySubject(1);

  private readonly API_RESOURCE_NAME = '/api/v1/login';
  private readonly API_USER_RESOURCE_NAME = '/api/v1/login-participant';

  private _userId: string = '';
  private _username: string = '';
  private _role: string = '';

  private browserService: BrowserStorageService = inject(BrowserStorageService);
  private router: Router = inject(Router);
  private translocoService: TranslocoService = inject(TranslocoService);

  constructor() {}

  get accessToken() {
    return 'Bearer random_token';
  }

  set accessToken(token: string | null | undefined) {}

  get authentificated$() {
    return this._authenticated$.asObservable();
  }

  get authentificated() {
    return this._authenticated;
  }

  login(model: any) {
    return this.handleLogin(model);
  }

  handleLogin(model: any) {
    return of(true);
  }

  logOut() {
    this.router.navigate(['/login']);
    this.clear();
  }

  public clear() {
    this._authenticated$.next(false);
    this._authenticated = false;
    this.browserService.clearLocalStorage();
    this.browserService.clearSessionStorage();
  }
}
