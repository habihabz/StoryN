import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class IFeedbackService {
  private apiUrl = `${environment.serverHostAddress}/api/Feedback`;
  private refreshFeedbacksSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.post<Feedback[]>(this.apiUrl + "/getFeedbacks", {});  
  }

  getFeedback(id: number): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl + "/getFeedback", id);  
  }

  deleteFeedback(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteFeedback", id); 
  }

  createOrUpdateFeedback(feedback: Feedback): Observable<DbResult> {
    feedback.f_created_on = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateFeedback", feedback); 
  }
  get refreshFeedbacks$() {
    return this.refreshFeedbacksSubject.asObservable();
  }
  refreshFeedbacks(): void {
    this.refreshFeedbacksSubject.next();
  }
}
