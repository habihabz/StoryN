import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class IclientService {
  private apiUrl = `${environment.serverHostAddress}/api/Client`;
  private refreshClientsSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.post<Client[]>(this.apiUrl + "/getClients", {});  
  }

  getClient(id: number): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + "/getClient", id);  
  }

  deleteClient(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteClient", id); 
  }

  createOrUpdateClient(client: Client): Observable<DbResult> {
    client.cl_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateClient", client); 
  }

  get refreshClients$() {
    return this.refreshClientsSubject.asObservable();
  }

  refreshClients(): void {
    this.refreshClientsSubject.next();
  }
}
