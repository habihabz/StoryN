import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { CustomerOrder } from '../models/customer.order.model';
import { RequestParms } from '../models/requestParms';

@Injectable({
  providedIn: 'root'
})
export class ICustomerOrder {
  private apiUrl = `${environment.serverHostAddress}/api/CustomerOrder`;
  private refreshSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getCustomerOrders(requestParms:RequestParms): Observable<CustomerOrder[]> {
    return this.http.post<CustomerOrder[]>(this.apiUrl + "/getCustomerOrders", requestParms);  
  }

  getCustomerOrder(id: number): Observable<CustomerOrder> {
    return this.http.post<CustomerOrder>(this.apiUrl + "/getCustomerOrder", id);  
  }

  deleteCustomerOrder(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteCustomerOrder", id); 
  }

  createOrUpdateCustomerOrder(customerOrder: CustomerOrder): Observable<DbResult> {
    customerOrder.co_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateCustomerOrder", customerOrder); 
  }
  
  get refresh$() {
    return this.refreshSubject.asObservable();
  }

  refresh(): void {
    this.refreshSubject.next();
  }

}
