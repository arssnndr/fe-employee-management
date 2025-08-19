import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isAuthenticatedSubject.next(isLoggedIn);
  }

  // Call backend API to login. Returns true if success, false otherwise.
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ message: string; user: any }>(`${environment.API_BASE_URL}/auth/login`, { username, password }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
        localStorage.setItem('isLoggedIn', 'true');
      }),
      map(() => true),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        localStorage.removeItem('isLoggedIn');
        return of(false);
      })
    );
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
