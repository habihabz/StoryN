import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Story } from '../models/story.model';
import { RequestParms } from '../models/requestParms';

@Injectable({
  providedIn: 'root'
})
export class IStoryService {
  private apiUrl = `${environment.serverHostAddress}/api/Story`;
  private refreshStoriesSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getStories(): Observable<Story[]> {
    return this.http.post<Story[]>(this.apiUrl + "/getStories", {});  
  }

  getStory(id: number): Observable<Story> {
    return this.http.post<Story>(this.apiUrl + "/getStory", id);  
  }

  deleteStory(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteStory", id); 
  }

  createOrUpdateStory(formData: FormData): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateStory", formData); 
  }

  startGame(requestParms:RequestParms): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/startGame", requestParms); 
  }

  getStoriesByRoom(id: number): Observable<Story[]> {
    return this.http.post<Story[]>(this.apiUrl + "/getStoriesByRoom", id);  
  }
  getStoriesByRoomCode(requestParm: RequestParms): Observable<Story[]> {
    return this.http.post<Story[]>(this.apiUrl + "/getStoriesByRoomCode", requestParm);  
  }

  get refreshStories$() {
    return this.refreshStoriesSubject.asObservable();
  }

  refreshStories(): void {
    this.refreshStoriesSubject.next();
  }
}
