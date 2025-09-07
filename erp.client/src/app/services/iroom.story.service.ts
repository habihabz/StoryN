import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { RoomStory } from '../models/room.story.model';

@Injectable({
  providedIn: 'root'
})
export class IRoomStoryService {
  private apiUrl = `${environment.serverHostAddress}/api/RoomStory`;
  private refreshRoomStoriesSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getRoomStories(): Observable<RoomStory[]> {
    return this.http.post<RoomStory[]>(this.apiUrl + "/getRoomStories", {});
  }

  getRoomStory(id: number): Observable<RoomStory> {
    return this.http.post<RoomStory>(this.apiUrl + "/getRoomStory", id);
  }

  deleteRoomStory(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteRoomStory", id);
  }

  createOrUpdateRoomStory(roomStory: RoomStory): Observable<DbResult> {
    roomStory.rs_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateRoomStory", roomStory);
  }

  getRoomStoriesByRoom(rs_room: number): Observable<RoomStory[]> {
    return this.http.post<RoomStory[]>(this.apiUrl + "/getRoomStoriesByRoom",rs_room);
  }


  get refreshRoomStories$() {
    return this.refreshRoomStoriesSubject.asObservable();
  }

  refreshRoomStories(): void {
    this.refreshRoomStoriesSubject.next();
  }
}