import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { ILoginService } from './ilogin.service';
import { Menu } from '../models/menu.model';
import { RequestParms } from '../models/requestParms';
import { MenuType } from '../models/menuType';
import { MenuAllocation } from '../models/menu.allocation.model';

@Injectable({
  providedIn: 'root'
})
export class IMenuService {
  private apiUrl = `${environment.serverHostAddress}/api/Menu`;
  private refreshMenusSubject = new Subject<void>();

  constructor(private http: HttpClient, private iLoginService: ILoginService) { }


  getMenus(): Observable<Menu[]> {
  
    return this.http.post<Menu[]>(`${this.apiUrl}/getMenus`, {});  
  }

  getMenu(id: number): Observable<Menu> {

    return this.http.post<Menu>(`${this.apiUrl}/getMenu`, id);  
  }

  getMenuTypes(): Observable<MenuType[]> {
    return this.http.post<MenuType[]>(`${this.apiUrl}/getMenuTypes`, {});  
  }

  getMenusByType( requestParms : RequestParms): Observable<Menu[]> {
    return this.http.post<Menu[]>(`${this.apiUrl}/getMenusByType`, requestParms);
  }

  getMenusByRoleAndType( requestParms : RequestParms): Observable<Menu[]> {
    return this.http.post<Menu[]>(`${this.apiUrl}/getMenusByRoleAndType`, requestParms);
  }

  deleteMenu(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteMenu", id); 
  }

  createOrUpdateMenu(menu: Menu): Observable<DbResult> {
    menu.m_cre_date = new Date().toISOString();
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateMenu", menu); 
  }

  createOrUpdateRoleMenu(menuallocation: MenuAllocation): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateRoleMenu", menuallocation); 
  }

  getMenusByRole(id: number): Observable<Menu[]> {
    return this.http.post<Menu[]>(this.apiUrl + "/getMenusByRole", id); 
  }

  get refreshMenus$() {
    return this.refreshMenusSubject.asObservable();
  }

  refreshMenus(): void {
    this.refreshMenusSubject.next();
  }
}
