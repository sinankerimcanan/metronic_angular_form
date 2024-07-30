import { Injectable } from '@angular/core';
import { Product } from '../pages/types/ProductModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  private apiUrl = 'http://localhost:3000/items/edit';
  private editSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >(this.getSepetFromLocalStorage());

  constructor(private http: HttpClient) {}

  // getData() {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  getItems(value: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.apiUrl + '?value=' + value);
  }
  updateItem(id: any, updateItem: Product): Observable<any> {
    const params = id;
    const body = updateItem;
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, updateItem);
  }

  getSepetFromLocalStorage(): Product[] {
    const data = localStorage.getItem('data');
    return data ? JSON.parse(data) : [];
  }
}
