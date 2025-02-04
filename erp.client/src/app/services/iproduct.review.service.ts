import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DbResult } from '../models/dbresult.model';
import { environment } from '../../environments/environment';
import { ProductReview } from '../models/product.review.model';

@Injectable({
  providedIn: 'root'
})
export class IProductReviewService {
  private apiUrl = `${environment.serverHostAddress}/api/ProductReview`;
  private refreshReviewsSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getProductReviews(prod_id: number): Observable<ProductReview[]> {
    return this.http.post<ProductReview[]>(`${this.apiUrl}/getProductReviews`, prod_id);
  }

  getProductReview(reviewId: number): Observable<ProductReview> {
    return this.http.post<ProductReview>(`${this.apiUrl}/getProductReview`, { reviewId });
  }

  deleteProductReview(reviewId: number): Observable<DbResult> {
    return this.http.post<DbResult>(`${this.apiUrl}/deleteProductReview`, { reviewId });
  }

  createOrUpdateProductReview(review: ProductReview): Observable<DbResult> {
    review.pr_created_on = new Date().toISOString();
    return this.http.post<DbResult>(`${this.apiUrl}/createOrUpdateProductReview`, review);
  }

  get refreshReviews$() {
    return this.refreshReviewsSubject.asObservable();
  }

  refreshReviews(): void {
    this.refreshReviewsSubject.next();
  }
}
