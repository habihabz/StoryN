import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { CustomerOrderStatus } from '../models/customer.order.status.model';


@Injectable({
  providedIn: 'root'
})
export class ICustomerOrderStatusService {
  private apiUrl = `${environment.serverHostAddress}/api/CustomerOrderStatus`;
  private subjects = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getCustomerOrderStatuses(): Observable<CustomerOrderStatus[]> {
    return this.http.post<CustomerOrderStatus[]>(this.apiUrl + "/getCustomerOrderStatuses", {});  
  }

  getCustomerOrderStatus(id: number): Observable<CustomerOrderStatus> {
    return this.http.post<CustomerOrderStatus>(this.apiUrl + "/getCustomerOrderStatus", id);  
  }

  deleteCustomerOrderStatus(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteCustomerOrderStatus", id); 
  }

  createOrUpdateCustomerOrderStatus(customerorderstatus: CustomerOrderStatus): Observable<DbResult> {
    customerorderstatus.cos_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateCustomerOrderStatus", customerorderstatus); 
  }
  get refresh$() {
    return this.subjects.asObservable();
  }
  refresh(): void {
    this.subjects.next();
  }
}
