import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { RequestParms } from '../models/requestParms';
import { ErrorLog } from '../models/error.log.model';

@Injectable({
  providedIn: 'root'
})
export class IErrorLogService {
  private apiUrl = `${environment.serverHostAddress}/api/ErrorLog`;
  private refreshSubject = new Subject<void>();
  errorLog:ErrorLog=new ErrorLog;
  
  constructor(private http: HttpClient) { }

  getErrorLogs(requestParms:RequestParms): Observable<ErrorLog[]> {
    return this.http.post<ErrorLog[]>(this.apiUrl + "/getErrorLogs", requestParms);  
  }

  getErrorLog(id: number): Observable<ErrorLog> {
    return this.http.post<ErrorLog>(this.apiUrl + "/getErrorLog", id);  
  }

  deleteErrorLog(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteErrorLog", id); 
  }

  createOrUpdateErrorLog(errorLog: ErrorLog): Observable<DbResult> {
    errorLog.el_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateErrorLog", errorLog); 
  }


   createLog(el_controller:string,el_action:string,el_error:string,el_cre_by:number) {
    
    this.errorLog.el_controller=el_controller;
    this.errorLog.el_action=el_action;
    this.errorLog.el_error=el_error;
    this.errorLog.el_cre_by=el_cre_by;
      this.createOrUpdateErrorLog(this.errorLog).subscribe(
        (data: DbResult) => {
          console.log(data.message);
        },
        (error: any) => {
  
        }
      );
  }
  
  get refreshErrorLogs$() {
    return this.refreshSubject.asObservable();
  }
  refreshErrorLogs(): void {
    this.refreshSubject.next();
  }
}
