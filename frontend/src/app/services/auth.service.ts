import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.config';

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  role?: string;
  exp?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly ACCESS_KEY = 'access_token';
  private readonly REFRESH_KEY = 'refresh_token';
  private readonly TOKEN_KEY = 'token'; // Para compatibilidade

  private user$ = new BehaviorSubject<AuthUser | null>(this.loadUser());

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private apiBase: string) {
    console.log('🔧 AuthService inicializado com base URL:', this.apiBase);
  }

  login(email: string, password: string): Observable<boolean> {
    console.log('🔐 Tentando login em:', `${this.apiBase}/login`);
    
    return this.http.post<{ token?: string; accessToken?: string }>(
        `${this.apiBase}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          // Suporte para diferentes formatos de resposta
          const token = res.token || res.accessToken;
          if (token) {
            localStorage.setItem(this.ACCESS_KEY, token);
            localStorage.setItem(this.TOKEN_KEY, token); // Para compatibilidade
            console.log('✅ Token armazenado:', token.substring(0, 20) + '...');
            this.user$.next(this.decodeToken(token));
          } else {
            console.warn('⚠️ Nenhum token recebido na resposta:', res);
          }
        }),
        map(() => true),
        catchError((err) => {
          console.error('❌ Erro no login:', err);
          alert('❌ Erro no login: ' + (err.error?.message || err.message));
          return throwError(() => err);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiBase}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.clearAuthData();
        this.user$.next(null);
        console.log('🚪 Logout realizado');
      }),
      catchError((err) => {
        console.error('❌ Erro no logout:', err);
        this.clearAuthData(); // Limpa mesmo com erro
        return throwError(() => err);
      })
    );
  }

  register(name: string, email: string, password: string, role: string): Observable<boolean> {
    console.log('📝 Tentando registro em:', `${this.apiBase}/register`);
    return this.http
      .post<{ success: boolean; token?: string; accessToken?: string }>(
        `${this.apiBase}/register`, 
        { name, email, password, role }, 
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          // Também processa token no registro, se fornecido
          const token = res.token || res.accessToken;
          if (token) {
            localStorage.setItem(this.ACCESS_KEY, token);
            localStorage.setItem(this.TOKEN_KEY, token);
            this.user$.next(this.decodeToken(token));
          }
        }),
        map(() => true),
        catchError((err) => {
          console.error('❌ Erro no registro:', err);
          return throwError(() => err);
        })
      );
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    // Verifica se o token está expirado
    try {
      const payload = this.decodeToken(token);
      if (payload && payload.exp) {
        const isExpired = Date.now() >= payload.exp * 1000;
        if (isExpired) {
          console.warn('⚠️ Token expirado');
          this.clearAuthData();
          return false;
        }
        return true;
      }
    } catch (e) {
      console.error('❌ Erro ao decodificar token:', e);
      this.clearAuthData();
      return false;
    }

    return !!token;
  }

  getAccessToken(): string | null {
    // Tenta múltiplas chaves para compatibilidade
    const token = localStorage.getItem(this.ACCESS_KEY) || 
                  localStorage.getItem(this.TOKEN_KEY);
    
    console.log('🔍 Buscando token:', token ? token.substring(0, 20) + '...' : 'null');
    return token;
  }

  refreshToken(): Observable<boolean> {
    console.log('🔄 Tentando refresh token...');
    return this.http.post<{ accessToken?: string; token?: string }>(
      `${this.apiBase}/refresh`, 
      {}, 
      { withCredentials: true }
    ).pipe(
      tap((res) => {
        const newToken = res.accessToken || res.token;
        if (newToken) {
          localStorage.setItem(this.ACCESS_KEY, newToken);
          localStorage.setItem(this.TOKEN_KEY, newToken);
          this.user$.next(this.decodeToken(newToken));
          console.log('✅ Token atualizado:', newToken.substring(0, 20) + '...');
        } else {
          console.warn('⚠️ Nenhum token recebido no refresh');
        }
      }),
      map(() => true),
      catchError((err) => {
        console.error('❌ Erro no refresh token:', err);
        this.clearAuthData();
        return throwError(() => err);
      })
    );
  }

  getUser$(): Observable<AuthUser | null> {
    return this.user$.asObservable();
  }

  getCurrentUser(): AuthUser | null {
    return this.user$.value;
  }

  // Decodifica token JWT
  private decodeToken(token: string): AuthUser | null {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      console.log('🔓 Token decodificado:', decoded);
      
      return {
        id: decoded.sub || decoded.id || '1',
        email: decoded.email || decoded.sub || 'user@example.com',
        name: decoded.name || decoded.username || 'Usuário',
        role: decoded.role,
        exp: decoded.exp
      };
    } catch (error) {
      console.error('❌ Erro ao decodificar token:', error);
      return null;
    }
  }

  private loadUser(): AuthUser | null {
    const token = this.getAccessToken();
    if (!token) return null;
    
    return this.decodeToken(token);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    console.log('🧹 Dados de autenticação removidos');
  }

  // Método para debug
  debugAuth(): void {
    const token = this.getAccessToken();
    console.log('🐛 Debug AuthService:');
    console.log('   Token exists:', !!token);
    console.log('   Token length:', token?.length);
    console.log('   Is authenticated:', this.isAuthenticated());
    console.log('   Current user:', this.getCurrentUser());
    console.log('   All localStorage:', Object.keys(localStorage));
    
    if (token) {
      try {
        const payload = this.decodeToken(token);
        console.log('   Token payload:', payload);
        if (payload?.exp) {
          console.log('   Token expires:', new Date(payload.exp * 1000));
          console.log('   Is expired:', Date.now() >= payload.exp * 1000);
        }
      } catch (e) {
        console.log('   Token invalid');
      }
    }
  }
}