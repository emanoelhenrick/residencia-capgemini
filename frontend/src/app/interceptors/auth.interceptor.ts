import { Injectable } from '@angular/core';
import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest, 
  HTTP_INTERCEPTORS, 
  HttpErrorResponse,  // ✅ IMPORTE ADICIONADO
  HttpResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🔐 Interceptor - Processando requisição:', req.url);
    
    // Não interceptar requisições de login/register
    if (req.url.includes('/login') || req.url.includes('/register')) {
      console.log('🔐 Interceptor - Ignorando (login/register)');
      return next.handle(req);
    }

    const token = this.auth.getAccessToken();
    console.log('🔐 Interceptor - Token disponível:', !!token, token?.substring(0, 20) + '...');
    
    let authReq = req;
    
    if (token && this.auth.isTokenValid()) {
      // Clone a requisição e adicione o header de autorização
      authReq = req.clone({ 
        setHeaders: { 
          Authorization: `Bearer ${token}`
        } 
      });
      console.log('🔐 Interceptor - Token adicionado aos headers');
    } else if (token && !this.auth.isTokenValid()) {
      console.log('⚠️ Interceptor - Token inválido!');
      // Se o token existir mas for inválido, limpar a sessão
      this.auth.logout().subscribe(() => {
        console.log('🔐 Interceptor - Sessão limpa devido a token inválido');
      });
    } else {
      console.log('⚠️ Interceptor - Nenhum token disponível');
    }

    console.log('🔐 Interceptor - Headers finais:', authReq.headers.keys());
    
    // Processar a requisição
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('✅ Interceptor - Resposta recebida:', event.status);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Interceptor - Erro na requisição:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          headers: error.headers,
          error: error.error
        });
        
        if (error.status === 401) {
          console.log('🔐 Interceptor - Token inválido ou expirado (401)');
          this.auth.logout().subscribe(() => {
            window.location.reload();
          });
        } else if (error.status === 403) {
          console.log('🔐 Interceptor - Acesso negado (403) - Verificando token...');
          
          // Verificar se o token ainda é válido
          if (!this.auth.isTokenValid()) {
            console.log('🔐 Interceptor - Token expirado, limpando sessão...');
            this.auth.logout().subscribe(() => {
              window.location.reload();
            });
          } else {
            console.log('🔐 Interceptor - Token válido, mas acesso negado (problema de permissões)');
          }
        }
        
        // Propagar o erro
        return throwError(() => error);
      })
    );
  }
}

export const AUTH_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};