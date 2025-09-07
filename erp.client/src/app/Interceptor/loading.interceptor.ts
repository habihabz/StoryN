import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loadingService';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const skipLoader = req.headers.get('X-Skip-Loader') === 'true';

    if (skipLoader) {
      // Remove the header so backend doesn't receive it
      const cloned = req.clone({
        headers: req.headers.delete('X-Skip-Loader')
      });
      return next.handle(cloned);
    }

    // Show loader by default
    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
