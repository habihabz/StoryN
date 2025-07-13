import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Answer } from '../models/answer.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IAnswerService {
  private apiUrl = `${environment.serverHostAddress}/api/Answer`;
  private refreshAnswersSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Answer[]> {
    return this.http.post<Answer[]>(this.apiUrl + "/getAnswers", {});
  }

  getAnswer(id: number): Observable<Answer> {
    return this.http.post<Answer>(this.apiUrl + "/getAnswer", id);
  }

  deleteAnswer(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteAnswer", id);
  }

  createOrUpdateAnswer(answer: Answer): Observable<DbResult> {
    answer.a_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateAnswer", answer);
  }

  getSubmittedStoryAnswers(st_id: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/getSubmittedStoryAnswers`, st_id);
  }


  get refreshAnswers$() {
    return this.refreshAnswersSubject.asObservable();
  }

  refreshAnswers(): void {
    this.refreshAnswersSubject.next();
  }
}
