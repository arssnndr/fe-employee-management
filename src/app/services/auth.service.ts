import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize auth state from token presence
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }

  // Register then auto-login
  register(username: string, password: string): Observable<boolean> {
    return this.http.post<{ message: string; user: any }>(`${environment.API_BASE_URL}/auth/register`, { username, password }).pipe(
      switchMap(() => this.login(username, password)),
      catchError(() => of(false))
    );
  }

  // Call backend API to login. Returns true if success, false otherwise.
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ message: string; token: string; user: any }>(`${environment.API_BASE_URL}/auth/login`, { username, password }).pipe(
      tap((resp) => {
        if (resp && resp.token) {
          localStorage.setItem('auth_token', resp.token);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      map((resp) => !!resp?.token),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        localStorage.removeItem('auth_token');
        return of(false);
      })
    );
  }

  logout(): void {
    // Inform backend to clear cookie (if any). Ignore errors.
    this.http.post(`${environment.API_BASE_URL}/auth/logout`, {}, { responseType: 'json' }).subscribe({
      next: () => {},
      error: () => {},
    });
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
