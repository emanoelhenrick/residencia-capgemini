import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {
  private apiUrl = 'http://localhost:8080/accommodation';

  constructor(private http: HttpClient) {}
  
  private getHeaders() {
    const token = localStorage.getItem('auth_token');
    let headersConfig: any = { 'Content-Type': 'application/json' };
    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    return new HttpHeaders(headersConfig);
  }

  getAccommodations(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  // Método para buscar acomodação por ID
  getAccommodationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Método para buscar quartos de uma acomodação
  getAccommodationByRoom(accommodationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${accommodationId}/rooms`, { headers: this.getHeaders() });
  }

  // Método para buscar um quarto específico
  getRoomById(accommodationId: string, roomId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${accommodationId}/rooms/${roomId}`, { headers: this.getHeaders() });
  }

  getImages(img: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/images/${img}`, { 
      headers: this.getHeaders(),
      responseType: 'blob' 
    });
  }
}