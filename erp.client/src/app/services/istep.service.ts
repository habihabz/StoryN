import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Step } from '../models/step.model';
import { RequestParms } from '../models/requestParms';

@Injectable({
  providedIn: 'root'
})
export class IStepService {
  private apiUrl = `${environment.serverHostAddress}/api/Step`;
  private refreshStepsSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getSteps(): Observable<Step[]> {
    return this.http.post<Step[]>(this.apiUrl + "/getSteps", {});
  }

  getStep(id: number): Observable<Step> {
    return this.http.post<Step>(this.apiUrl + "/getStep", id);
  }

  deleteStep(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteStep", id);
  }

  createOrUpdateStep(formData: FormData): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateStep", formData);
  }

  getStepsOfAStory(id: number): Observable<Step[]> {
    return this.http.post<Step[]>(this.apiUrl + "/getStepsOfAStory", id);
  }
  getNextStepOfaStory(requestParms: RequestParms): Observable<Step> {
    return this.http.post<Step>(this.apiUrl + "/getNextStepOfaStory", requestParms);
  }

  get refreshSteps$() {
    return this.refreshStepsSubject.asObservable();
  }

  refreshSteps(): void {
    this.refreshStepsSubject.next();
  }
}
