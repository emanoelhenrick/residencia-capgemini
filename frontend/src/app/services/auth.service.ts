// auth.service.ts
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../app.config';

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly ACCESS_KEY = 'access_token';
  private readonly USER_KEY = 'current_user';

  private user$ = new BehaviorSubject<AuthUser | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private apiBase: string) {
    this.loadUserFromStorage();
  }

  // ✅ Carregar usuário do localStorage
  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.ACCESS_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('👤 Usuário carregado do storage:', user);
        
        // Verificar se o token ainda é válido
        if (this.isTokenValid(token)) {
          this.user$.next(user);
          this.scheduleTokenExpirationCheck(token);
        } else {
          console.log('⚠️ Token expirado, limpando...');
          this.clearStorage();
        }
      } catch (error) {
        console.error('❌ Erro ao carregar usuário:', error);
        this.clearStorage();
      }
    }
  }

  // ✅ Login
  login(email: string, password: string): Observable<boolean> {
    console.log('🔐 Login para:', email);
    
    return this.http.post<any>(`${this.apiBase}/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('✅ Resposta do login:', response);
          
          const token = response.token || response.accessToken;
          if (!token) {
            throw new Error('Token não recebido do servidor');
          }
          
          // Salvar token
          localStorage.setItem(this.ACCESS_KEY, token);
          console.log('✅ Token salvo');
          
          // Extrair ou obter usuário
          let user: AuthUser;
          if (response.user) {
            user = response.user;
          } else {
            user = this.extractUserFromToken(token);
            user.email = email; // Garantir que o email está correto
          }
          
          // Salvar usuário
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this.user$.next(user);
          console.log('✅ Usuário salvo:', user);
          
          // Agendar verificação de expiração
          this.scheduleTokenExpirationCheck(token);
        }),
        map(() => true),
        catchError(error => {
          console.error('❌ Erro no login:', error);
          return throwError(() => error);
        })
      );
  }

  // ✅ Extrair usuário do token JWT
  private extractUserFromToken(token: string): AuthUser {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('🔍 Payload do token:', payload);
      
      return {
        id: payload.sub || payload.id || '1',
        email: payload.sub || payload.email || '',
        name: payload.name || payload.sub?.split('@')[0] || 'Usuário',
        role: payload.role || payload.authorities?.[0] || 'USER'
      };
    } catch (error) {
      console.error('❌ Erro ao extrair usuário do token:', error);
      return {
        id: '1',
        email: '',
        name: 'Usuário',
        role: 'USER'
      };
    }
  }

  // ✅ Verificar se o token é válido
  isTokenValid(token?: string): boolean {
    const tokenToCheck = token || this.getAccessToken();
    if (!tokenToCheck) return false;
    
    try {
      const payload = JSON.parse(atob(tokenToCheck.split('.')[1]));
      const exp = payload.exp * 1000;
      const now = Date.now();
      const isValid = now < exp;
      
      console.log('🔍 Validação do token:', {
        expiraEm: new Date(exp).toLocaleString(),
        agora: new Date(now).toLocaleString(),
        valido: isValid,
        expiradoEm: Math.round((exp - now) / 60000) + ' minutos'
      });
      
      return isValid;
    } catch {
      return false;
    }
  }

  // ✅ Agendar verificação de expiração
  private scheduleTokenExpirationCheck(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      const now = Date.now();
      const timeUntilExpiration = exp - now;
      
      // Limpar timer anterior
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      
      // Agendar verificação 1 minuto antes da expiração
      if (timeUntilExpiration > 60000) {
        this.tokenExpirationTimer = setTimeout(() => {
          console.log('⚠️ Token prestes a expirar');
          if (!this.isTokenValid()) {
            this.clearStorage();
          }
        }, timeUntilExpiration - 60000);
      }
    } catch (error) {
      console.error('❌ Erro ao agendar verificação do token:', error);
    }
  }

  // ✅ Verificar autenticação
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const user = this.getCurrentUser();
    const tokenValid = token ? this.isTokenValid(token) : false;
    
    const result = !!token && !!user && tokenValid;
    
    console.log('🔐 isAuthenticated:', {
      result,
      temToken: !!token,
      temUsuario: !!user,
      tokenValido: tokenValid
    });
    
    return result;
  }

  // ✅ Logout
  logout(): Observable<any> {
    const token = this.getAccessToken();
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }) : new HttpHeaders();
    
    return this.http.post(`${this.apiBase}/logout`, {}, { headers }).pipe(
      tap(() => {
        console.log('✅ Logout no backend bem-sucedido');
        this.clearStorage();
      }),
      catchError(error => {
        console.warn('⚠️ Erro no logout do backend, limpando localmente:', error);
        this.clearStorage();
        return of(null);
      })
    );
  }

  // ✅ Limpar storage
  private clearStorage(): void {
    console.log('🧹 Limpando storage...');
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.user$.next(null);
    
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    
    console.log('✅ Storage limpo');
  }

  // ✅ Getters
  getCurrentUser(): AuthUser | null {
    return this.user$.value;
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  getUser$(): Observable<AuthUser | null> {
    return this.user$.asObservable();
  }

  // ✅ Register (se necessário)
  register(name: string, email: string, password: string, role: string = 'HOST'): Observable<boolean> {
    return this.http.post<any>(`${this.apiBase}/register`, { name, email, password, role })
      .pipe(
        map(() => true),
        catchError(error => {
          console.error('❌ Erro no registro:', error);
          return throwError(() => error);
        })
      );
  }
}