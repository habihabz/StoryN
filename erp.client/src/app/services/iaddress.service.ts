import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Address } from '../models/address.model';
import { RequestParms } from '../models/requestParms';

@Injectable({
  providedIn: 'root'
})
export class IAddressService {
  private apiUrl = `${environment.serverHostAddress}/api/Address`;
  private refreshSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getAddresses(requestParms:RequestParms): Observable<Address[]> {
    return this.http.post<Address[]>(this.apiUrl + "/getAddresses", requestParms);  
  }

  createOrUpdateAddress(address: Address): Observable<DbResult> {
    address.ad_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateAddress", address);
  }

  deleteAddress(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteAddress", id);
  }

  getMyAddresses(requestParms:RequestParms): Observable<Address[]> {
    return this.http.post<Address[]>(this.apiUrl + "/getMyAddresses", requestParms);  
  }

  getAddress(id:number): Observable<Address[]> {
    return this.http.post<Address[]>(this.apiUrl + "/getAddress", id);  
  }

  get refreshAddresss$() {
    return this.refreshSubject.asObservable();
  }
  refreshAddresss(): void {
    this.refreshSubject.next();
  }
}
