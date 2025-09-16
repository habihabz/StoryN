import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { RoomMember } from '../models/room.member.model';

@Injectable({
  providedIn: 'root'
})
export class IRoomMemberService {
  private apiUrl = `${environment.serverHostAddress}/api/RoomMember`;
  private refreshRoomMembersSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getRoomMembers(): Observable<RoomMember[]> {
    return this.http.post<RoomMember[]>(this.apiUrl + "/getRoomMembers", {});
  }

  getRoomMember(id: number): Observable<RoomMember> {
    return this.http.post<RoomMember>(this.apiUrl + "/getRoomMember", id);
  }

  deleteRoomMember(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteRoomMember", id);
  }

  createOrUpdateRoomMember(roomMember: RoomMember): Observable<DbResult> {
    roomMember.rmb_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateRoomMember", roomMember);
  }

  get refreshRoomMembers$() {
    return this.refreshRoomMembersSubject.asObservable();
  }

  refreshRoomMembers(): void {
    this.refreshRoomMembersSubject.next();
  }
  getRoomMembersByRoom(id:number): Observable<RoomMember[]> {
    return this.http.post<RoomMember[]>(this.apiUrl + "/getRoomMembersByRoom", id);
  }

}
