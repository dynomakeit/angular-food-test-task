import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly http = inject(HttpClient);

  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<boolean | null>(null);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = req.clone({
      withCredentials: true,
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/Auth/')) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshSubject.next(null);

      return this.http.get('/api/v1/Auth/refresh', { withCredentials: true }).pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshSubject.next(true);
          return next.handle(req);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.refreshSubject.next(false);
          this.logout();
          return throwError(() => err);
        })
      );
    }

    return this.refreshSubject.pipe(
      filter((result) => result !== null),
      take(1),
      switchMap((success) => {
        if (success) {
          return next.handle(req);
        }
        return throwError(() => new Error('Refresh failed'));
      })
    );
  }

  private logout(): void {
    localStorage.removeItem('isAuthenticated');
  }
}
