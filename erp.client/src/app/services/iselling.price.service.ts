import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { SellingPrice } from '../models/selling.price.model';

@Injectable({
  providedIn: 'root'
})
export class ISellingPriceService {
  private apiUrl = `${environment.serverHostAddress}/api/SellingPrice`;
  private refreshSellingPricesSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getSellingPrices(sellingPrice :SellingPrice): Observable<SellingPrice[]> {
    sellingPrice.sp_cre_date = new Date().toISOString();
    sellingPrice.sp_start_date = new Date().toISOString();
    sellingPrice.sp_end_date = new Date().toISOString();
    return this.http.post<SellingPrice[]>(this.apiUrl + "/getSellingPrices", sellingPrice);  
  }

  getSellingPrice(id: number): Observable<SellingPrice> {
    return this.http.post<SellingPrice>(this.apiUrl + "/getSellingPrice", id);  
  }

  deleteSellingPrice(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteSellingPrice", id); 
  }

  changePrice(sellingprice: SellingPrice): Observable<DbResult> {
    sellingprice.sp_cre_date = new Date().toISOString();
    sellingprice.sp_end_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/changePrice", sellingprice); 
  }
  get refreshSellingPrices$() {
    return this.refreshSellingPricesSubject.asObservable();
  }
  refreshSellingPrices(): void {
    this.refreshSellingPricesSubject.next();
  }
}
