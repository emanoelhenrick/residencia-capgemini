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
    // Não adicionar token para requisições de login/register
    if (req.url.includes('/login') || req.url.includes('/register')) {
      return next.handle(req);
    }

    const token = this.auth.getAccessToken();
    let authReq = req;
    
    console.log(`🌐 Interceptando: ${req.method} ${req.url}`);
    
    if (token && this.auth.isAuthenticated()) {
      console.log('📤 Adicionando token aos headers');
      authReq = req.clone({ 
        setHeaders: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      });
    } else {
      console.warn('⚠️ Requisição sem token - usuário não autenticado');
    }

    return next.handle(authReq).pipe(
      catchError((err) => {
        console.error('❌ Erro na requisição:', {
          status: err.status,
          url: err.url,
          message: err.message
        });
        
        if (err.status === 401 && !this.isRefreshing) {
          return this.handle401Error(req, next);
        }
        
        if (err.status === 403) {
          console.error('🔐 Acesso proibido (403):');
          console.error('   - Token pode ser inválido');
          console.error('   - Usuário sem permissões');
          console.error('   - Problema de CORS');
          this.auth.debugAuth(); // Debug automático
        }
        
        return throwError(() => err);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isRefreshing = true;
    console.log('🔄 Tentando refresh token devido a 401...');

    return this.auth.refreshToken().pipe(
      switchMap(() => {
        this.isRefreshing = false;
        const newToken = this.auth.getAccessToken();
        console.log('✅ Token refreshado, refazendo requisição');
        const retryReq = req.clone({ 
          setHeaders: { Authorization: `Bearer ${newToken}` } 
        });
        return next.handle(retryReq);
      }),
      catchError((refreshErr) => {
        this.isRefreshing = false;
        console.error('❌ Falha no refresh token, redirecionando para login');
        this.auth.logout().subscribe();
        // Você pode redirecionar para login aqui
        // this.router.navigate(['/login']);
        return throwError(() => refreshErr);
      })
    );
  }
}

export const AUTH_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};