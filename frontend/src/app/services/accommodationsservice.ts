import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {
  private apiUrl = 'http://localhost:3000/accommodations';

  constructor(private http: HttpClient) {}

  getAccommodations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getObjects(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getImages(img: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/images/${img}`, { responseType: 'blob' });
  }
}
  