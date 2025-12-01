// room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/room';

  constructor(private http: HttpClient) { }

  filterRooms(filters: any): Observable<any> {
    console.log('🚀 Enviando filtros para:', this.apiUrl);
    console.log('📊 Filtros:', filters);
    
    return this.http.get(this.apiUrl, filters);
  }
}