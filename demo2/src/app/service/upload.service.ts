import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../pages/types/ProductModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}

  addItem(value: Product): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = value;
    return this.http.post<any>(`${this.apiUrl}`, body, { headers });
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
