import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Product } from '../pages/types/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class SepetService {
  private apiUrl = 'http://localhost:3000/items/sepet';
  private sepetSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >(this.getSepetFromLocalStorage());

  setSepetData(data: Product[]) {
    this.sepetSubject.next(data);
    this.updateLocalStorage(data);
  }

  // addToSepetData(data: Product) {
  //   const currentSepet = this.sepetSubject.value;
  //   currentSepet.push(data);
  //   this.sepetSubject.next(currentSepet);
  //   this.updateLocalStorage(currentSepet);
  // }

  getSepetData(): Observable<Product[]> {
    console.log('getSepetData : ', this.sepetSubject);
    return this.sepetSubject.asObservable();
  }

  getItems(value: number[]): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any[]>(this.apiUrl + '?value=' + value);
  }

  getSepetFromLocalStorage(): Product[] {
    const sepet = localStorage.getItem('sepet');
    return sepet ? JSON.parse(sepet) : [];
  }

  private updateLocalStorage(sepet: Product[]): void {
    localStorage.setItem('sepet', JSON.stringify(sepet));
  }

  clearSepet(): void {
    localStorage.removeItem('sepet');
    this.sepetSubject.next([]);
  }
  getItem(value: number): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const body = { value };
    return this.http.get<Product>(this.apiUrl + '?value=' + value);
  }
  constructor(private http: HttpClient) {}

  // sepetData: Product[];

  // setSepetData(data: Product[]) {
  //   // this.sepetData.next(data)
  // }
  // getSepetData() {
  //   console.log(this.sepetData);
  // }
  // getItems(value: number[]): Observable<any[]> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   // const body = { value };
  //   return this.http.get<any[]>(this.apiUrl + '?value=' + value);
  // }
  // sepeteEkle(urunId: number) {
  //   const sepetStr = localStorage.getItem('sepet');
  //   let sepet: number[] = sepetStr ? JSON.parse(sepetStr) : [];
  //   sepet.push(urunId);
  //   localStorage.setItem('sepet', JSON.stringify(sepet));
  //   console.log(`Ürün ID: ${urunId} sepete eklendi.`);

  // }
}
