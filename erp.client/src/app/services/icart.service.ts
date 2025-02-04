import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Cart } from '../models/cart.model';
import { RequestParms } from '../models/requestParms';

@Injectable({
  providedIn: 'root'
})
export class ICartService {
  private apiUrl = `${environment.serverHostAddress}/api/Cart`;
  private refreshSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getCarts(requestParms:RequestParms): Observable<Cart[]> {
    return this.http.post<Cart[]>(this.apiUrl + "/getCarts", requestParms);  
  }

  createOrUpdateCart(cart: Cart): Observable<DbResult> {
    cart.c_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateCart", cart);
  }

  deleteCart(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteCart", id);
  }

  get refreshCarts$() {
    return this.refreshSubject.asObservable();
  }
  refreshCarts(): void {
    this.refreshSubject.next();
  }
}
