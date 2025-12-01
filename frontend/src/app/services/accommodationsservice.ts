import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {
  private apiUrl = 'http://localhost:8080/accommodation';
  private roomApiUrl = 'http://localhost:8080/room';

  constructor(private http: HttpClient) {}

  getAccommodations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para buscar acomodação por ID
  getAccommodationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Método para buscar quartos de uma acomodação
  getAccommodationByRoom(accommodationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${accommodationId}/rooms`);
  }

  // Método para buscar um quarto específico
  getRoomById(accommodationId: string, roomId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${accommodationId}/rooms/${roomId}`);
  }

  getImages(img: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/images/${img}`, { 
      responseType: 'blob' 
    });
  }

  // Método para filtrar quartos
  filterRooms(filter: any): Observable<any> {
    return this.http.post<any>(this.roomApiUrl, filter);
  }
}