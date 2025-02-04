import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';
import { UserCredential } from '../models/usercredential.model';
import { CustomerCredential } from '../models/customer.credential.model';

@Injectable({
  providedIn: 'root'
})
export class ICustomerService {
  private apiUrl = `${environment.serverHostAddress}/api/Customer`;
  private refreshCustomersSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.post<Customer[]>(this.apiUrl + "/getCustomers", {});  
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl + "/getCustomer", id);  
  }

  deleteCustomer(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteCustomer", id); 
  }

  createOrUpdateCustomer(customer: Customer): Observable<DbResult> {
    customer.c_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateCustomer", customer); 
  }
  registerCustomer(customer: Customer): Observable<DbResult> {
    customer.c_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/registerCustomer", customer); 
  }

  getCustomerLogin(customerCredential:CustomerCredential): Observable<CustomerCredential> {
      return this.http.post<CustomerCredential>(this.apiUrl + "/getCustomerLogin", customerCredential).pipe(
        tap((response: CustomerCredential) => {
          localStorage.setItem('customertoken', response.token);
        })
      );;  
  }

  getCurrentCutomer(): Customer  {
    const customerJson = sessionStorage.getItem('customer');
    if (customerJson) {
      try {
        const customer: Customer = JSON.parse(customerJson);
        return customer;
      } catch (error) {

        console.error('Failed to parse customer data:', error);
        return new Customer(); // Return null or handle the error as needed
      }
    }
    return new Customer(); // Return null if no user data is found
  }

  get refreshCustomers$() {
    return this.refreshCustomersSubject.asObservable();
  }
  refreshCustomers(): void {
    this.refreshCustomersSubject.next();
  }
}
