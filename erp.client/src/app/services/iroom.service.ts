import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class IroomService {
  private apiUrl = `${environment.serverHostAddress}/api/Room`;
  private refreshRoomsSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.post<Room[]>(this.apiUrl + "/getRooms", {});  
  }

  getRoom(id: number): Observable<Room> {
    return this.http.post<Room>(this.apiUrl + "/getRoom", id);  
  }

  deleteRoom(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteRoom", id); 
  }

  createOrUpdateRoom(room: Room): Observable<DbResult> {
    room.rm_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateRoom", room); 
  }
  get refreshRooms$() {
    return this.refreshRoomsSubject.asObservable();
  }
  refreshRooms(): void {
    this.refreshRoomsSubject.next();
  }
}
