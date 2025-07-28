import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { AuthUtils } from '../utils/auth.utils';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { BrowserStorageService } from '../services/browser-storage.service';
import { MessageService } from 'primeng/api';
import { BaseApiService } from '../services/base-api.service';
import { ToastrService } from '../services/toastr.service';
import { RoleEnum } from './role.enum';

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

  constructor(
    private $storage: BrowserStorageService,
    private router: Router,
    private toastrService: ToastrService,
    private translocoService: TranslocoService,
    private baseApiService: BaseApiService,
  ) {
    this._authenticated$.next(
      !AuthUtils.isTokenExpired(this.accessToken || ''),
    );

    this._authenticated = !AuthUtils.isTokenExpired(this.accessToken || '');

    const decodedToken = AuthUtils._decodeToken(this.accessToken || '');

    if (decodedToken) {
      if (decodedToken.role == RoleEnum.ADMIN) {
        this.userId = decodedToken.user_id;
        this.userRole = decodedToken.role;
        this.userName = decodedToken.username;
      } else {
        this.userId = decodedToken.nameid;
        this.userRole = decodedToken.role;
        this.userName = decodedToken.unique_name;
      }
    }
  }

  get userId() {
    return this._userId;
  }

  set userId(id: string) {
    this._userId = id;
  }

  get userName() {
    return this._username;
  }

  set userName(name: string) {
    this._username = name;
  }

  get userRole() {
    return this._role;
  }

  set userRole(role: string) {
    this._role = role;
  }

  get accessToken() {
    return this.$storage.accessToken;
  }

  set accessToken(token: string | null | undefined) {
    this.$storage.accessToken = token;
  }

  get authentificated$() {
    return this._authenticated$.asObservable();
  }

  get authentificated() {
    return this._authenticated;
  }

  login(model: any) {
    return this.handleLogin(this.API_RESOURCE_NAME, model);
  }

  loginUser(model: any) {
    return this.handleLogin(this.API_USER_RESOURCE_NAME, model);
  }

  handleLogin(resourceName: string, model: any) {
    if (this._authenticated) {
      this.toastrService.error('auth.login-error', 'auth.login-details');
      setTimeout(() => {
        this.logOut();
      }, 3000);
      return throwError(() => new Error('You are already logged in!'));
    }

    return this.baseApiService
      .post(this.baseApiService.baseUrl + resourceName, model)
      .pipe(
        tap((res: any) => {
          this.$storage.accessToken = null;
        }),
        map((response: any) => {
          if (!response) {
            return null;
          }

          this.accessToken = response.result?.access_token ?? '';
          this._authenticated$.next(true);
          this._authenticated = true;

          const decodedToken = AuthUtils._decodeToken(this.accessToken || '');

          if (decodedToken) {
            if (decodedToken.role == RoleEnum.ADMIN) {
              this.userId = decodedToken.user_id;
              this.userRole = decodedToken.role;
              this.userName = decodedToken.username;
            } else {
              this.userId = decodedToken.nameid;
              this.userRole = decodedToken.role;
              this.userName = decodedToken.unique_name;
            }
          }

          return response;
        }),
        catchError(err => {
          console.log(err);
          this.toastrService.error(
            'auth.login-error',
            `auth.${err.error.message}`,
          );
          return throwError(() => err);
        }),
      );
  }

  logOut() {
    if (this.userRole == RoleEnum.ADMIN) {
      this.router.navigate(['/auth/admin/login']);
    } else {
      this.router.navigate(['/auth/login']);
    }
    this.clear();
  }

  public clear() {
    this._authenticated$.next(false);
    this._authenticated = false;
    this.$storage.clearLocalStorage();
    this.$storage.clearSessionStorage();
  }
}
