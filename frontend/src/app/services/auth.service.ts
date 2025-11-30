import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../app.config';

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly ACCESS_KEY = 'access_token';
  private readonly REFRESH_KEY = 'refresh_token';

  private user$ = new BehaviorSubject<AuthUser | null>(this.loadUser());

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private apiBase: string) {}

  login(email: string, password: string): Observable<boolean> {
    console.log('Tentando login em:', `${this.apiBase}/login`);
    return this.http.post<{ accessToken?: string; refreshToken?: string; user?: AuthUser }>(
        `${this.apiBase}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          if (res.accessToken) localStorage.setItem(this.ACCESS_KEY, res.accessToken);
          if (res.refreshToken) localStorage.setItem(this.REFRESH_KEY, res.refreshToken);
          if (res.user) this.user$.next(res.user);

          console.log('✅ Login realizado com sucesso!');
          alert('✅ Login realizado com sucesso!');

        }),
        map(() => true),
        catchError((err) => {
            console.error('Erro no registro:', err);
            return throwError(() => err);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiBase}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem(this.ACCESS_KEY);
        localStorage.removeItem(this.REFRESH_KEY);
        this.user$.next(null);
      })
    );
  }

  register(name: string, email: string, password: string, role: string): Observable<boolean> {
    console.log('Tentando registro em:', `${this.apiBase}/register`);
    return this.http
      .post<{ success: boolean }>(`${this.apiBase}/register`, { name, email, password, role }, { withCredentials: true })
      .pipe(
        map(() => true),
        catchError((err) => {
          console.error('Erro no registro:', err);
          return throwError(() => err);
        })
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.ACCESS_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  refreshToken(): Observable<boolean> {
    return this.http.post<{ accessToken?: string }>(`${this.apiBase}/refresh`, {}, { withCredentials: true }).pipe(
      tap((res) => {
        if (res.accessToken) localStorage.setItem(this.ACCESS_KEY, res.accessToken);
      }),
      map(() => true),
      catchError((err) => throwError(() => err))
    );
  }

  getUser$(): Observable<AuthUser | null> {
    return this.user$.asObservable();
  }

  private loadUser(): AuthUser | null {
    const token = localStorage.getItem(this.ACCESS_KEY);
    if (!token) return null;
    // Optionally, decode token to build user. For now return placeholder until backend provides user
    return { id: '1', email: 'user@example.com', name: 'Usuário' };
  }
}
