import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAccessToken();
    let authReq = req;
    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(authReq).pipe(
      catchError((err) => {
        // If unauthorized, try refresh once
        if (err && err.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.auth.refreshToken().pipe(
            switchMap(() => {
              this.isRefreshing = false;
              const newToken = this.auth.getAccessToken();
              const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
              return next.handle(retryReq);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }
}

export const AUTH_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
