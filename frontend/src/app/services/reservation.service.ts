
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface ReservationRequest {
  userEmail: string;
  roomId: string;
  initialDate: string;
  finalDate: string;
  specialRequests?: string;
  guests?: number;
  guestName?: string;
  guestPhone?: string;
  paymentMethod?: string;
}

export interface ReservationResponse {
  id: string;
  userEmail: string;
  roomId: string;
  initialDate: string;
  finalDate: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  roomNumber?: string;
  accommodationName?: string;
  specialRequests?: string;
  guests?: number;
  guestName?: string;
  guestPhone?: string;
  paymentMethod?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/reservation';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
  const token = this.authService.getAccessToken();
  
  console.log('getHeaders() - Token disponível:', !!token);
  console.log('Token completo:', token);
  
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  if (token) {
    // Teste 1: Adicionar como Bearer
    headers = headers.set('Authorization', `Bearer ${token}`);
    console.log('Authorization header adicionado (Bearer)');
    
    // Teste 2: Também adicionar como header customizado
    headers = headers.set('X-Auth-Token', token);
  }

  // Log todos os headers
  console.log('📋 Headers finais:');
  headers.keys().forEach(key => {
    const value = headers.get(key);
    console.log(`  ${key}: ${key === 'Authorization' ? value?.substring(0, 50) + '...' : value}`);
  });

  return headers;
}
 
  createReservation(reservationData: Omit<ReservationRequest, 'userEmail'>): Observable<ReservationResponse> {
    console.log('Criando reserva...');
    
    // Verificar autenticação
    if (!this.authService.isAuthenticated()) {
      console.error('Usuário não autenticado');
      return throwError(() => new Error('Usuário não autenticado. Faça login para continuar.'));
    }

    // Obter email do usuário logado
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.email) {
      console.error('Email do usuário não encontrado');
      return throwError(() => new Error('Email do usuário não encontrado.'));
    }

    // Preparar dados
    const formattedData: ReservationRequest = {
      userEmail: currentUser.email,
      ...reservationData,
      initialDate: this.formatDateTime(reservationData.initialDate),
      finalDate: this.formatDateTime(reservationData.finalDate)
    };

    console.log('Dados da reserva:', formattedData);
    console.log('Headers:', this.getHeaders());
    
      // DEBUG: Mostrar exatamente o que será enviado
  console.log('DEBUG - Requisição completa:', {
    url: this.apiUrl,
    headers: Array.from(this.getHeaders().keys()).map(key => 
      `${key}: ${this.getHeaders().get(key)}`
    ),
    body: formattedData,
    token: this.authService.getAccessToken()?.substring(0, 50) + '...'
  });

    // Fazer requisição
    return this.http.post<ReservationResponse>(
      this.apiUrl,
      formattedData,
      { 
        headers: this.getHeaders(),
        observe: 'response' // Para ver a resposta completa
      }
    ).pipe(
      tap(response => {
        console.log('   Reserva criada com sucesso!');
        console.log('   Status:', response.status);
        console.log('   Status Text:', response.statusText);
        console.log('   Headers:', response.headers);
      }),
      map(response => {
        if (!response.body) {
          throw new Error('Resposta vazia do servidor');
        }
        return response.body;
      }),
      catchError(this.handleError.bind(this))
    );
  }

  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('ERRO NA REQUISIÇÃO:', {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      error: error.error,
      headers: error.headers
    });

    let errorMessage = 'Ocorreu um erro ao processar sua solicitação.';

    if (error.status === 0) {
      errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
    } else if (error.status === 401) {
      errorMessage = 'Sessão expirada. Faça login novamente.';
      this.authService.logout().subscribe();
    } else if (error.status === 403) {
      errorMessage = 'Acesso negado. Verifique suas permissões ou tente fazer login novamente.';
      
      // Verificar se o token é válido
      if (!this.authService.isTokenValid()) {
        errorMessage = 'Token expirado. Faça login novamente.';
        this.authService.logout().subscribe();
      }
    } else if (error.status === 400) {
      errorMessage = error.error?.message || 'Dados inválidos. Verifique as informações enviadas.';
    } else if (error.status === 404) {
      errorMessage = 'Recurso não encontrado.';
    } else if (error.status === 409) {
      errorMessage = 'Este quarto já está reservado para o período selecionado.';
    } else if (error.status === 422) {
      errorMessage = 'Dados inválidos. Verifique as datas e informações fornecidas.';
    } else if (error.status >= 500) {
      errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
    }

    console.error('Mensagem de erro para o usuário:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

 
  private formatDateTime(dateString: string): string {
    if (!dateString) return '';
    

    const date = new Date(dateString);
    
    // Adicionar horário padrão (meio-dia)
    date.setHours(12, 0, 0, 0);
    return date.toISOString().slice(0, 19);
  }

 
  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getCurrentUserEmail(): string | null {
    return this.authService.getCurrentUser()?.email || null;
  }

  getUserReservations(): Observable<ReservationResponse[]> {
    const userEmail = this.getCurrentUserEmail();
    if (!userEmail) {
      return of([]);
    }

    return this.http.get<ReservationResponse[]>(
      `${this.apiUrl}/user/${encodeURIComponent(userEmail)}`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
