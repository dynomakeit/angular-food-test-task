import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

const API_URL = '/api/v1';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        ready: () => void;
      };
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly AUTH_KEY = 'isAuthenticated';

  readonly isAuthenticated = signal(this.checkAuth());

  private checkAuth(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  loginWithTelegram(): Observable<void | null> {
    const initData = window.Telegram?.WebApp?.initData;

    if (!initData) {
      console.warn('Telegram WebApp initData not available');
      return of(null);
    }

    return this.http.post<void>(`${API_URL}/Auth/tg/login`, { initData }).pipe(
      tap(() => {
        localStorage.setItem(this.AUTH_KEY, 'true');
        this.isAuthenticated.set(true);
        window.Telegram?.WebApp?.ready();
      }),
      catchError((err) => {
        console.error('Telegram auth failed:', err);
        return of(null);
      })
    );
  }

  refreshToken(): Observable<void | null> {
    return this.http.get<void>(`${API_URL}/Auth/refresh`).pipe(
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.isAuthenticated.set(false);
  }
}
