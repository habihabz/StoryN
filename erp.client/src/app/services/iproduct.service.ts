import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { RequestParms } from '../models/requestParms';
import { ProductSearchParms } from '../models/product.search.parms.model';

@Injectable({
  providedIn: 'root'
})
export class IProductService {
  private apiUrl = `${environment.serverHostAddress}/api/Product`;
  private refreshProductsSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl + "/getProducts", {});  
  }

  getProductsByCountry(id:number): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl + "/getProductsByCountry", id);  
  }

  getProduct(id: number): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + "/getProduct", id);  
  }

  getProductByCountry(requestParms: RequestParms): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + "/getProductByCountry", requestParms);  
  }

  deleteProduct(id: number): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/deleteProduct", id); 
  }

  createOrUpdateProduct(formData: FormData): Observable<DbResult> {
    return this.http.post<DbResult>(this.apiUrl + "/createOrUpdateProduct", formData);
  }

  getProductsByFilters(productSearchParms:ProductSearchParms): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl + "/getProductsByFilters", productSearchParms);  
  }

  get refreshProducts$() {
    return this.refreshProductsSubject.asObservable();
  }
  refreshProducts(): void {
    this.refreshProductsSubject.next();
  }
}
