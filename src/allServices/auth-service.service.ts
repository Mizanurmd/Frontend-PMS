import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = 'http://localhost:8081/api/v1';  // Adjust the URL as 
  constructor(private http: HttpClient, private router: Router) {}

  // Register user
  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/register`, user, { headers })
      .pipe(
        catchError(this.handleError)
      );
      
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/users/exists?username=${username}`);
  }
  // Login user
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }, { headers })
      .pipe(
        tap(response => this.handleLoginSuccess(response)),
        catchError(this.handleError)
      );
  }

  // Handle login success
  private handleLoginSuccess(response: any): void {
    this.saveTokens(response.accessToken, response.refreshToken);
    // Redirect user based on their role
    if (response.role === 'ADMIN') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  // Save JWT tokens in local storage
   saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  // Retrieve the access token from local storage
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Retrieve the refresh token from local storage
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  // Check if user is authenticated by checking the presence of an access token
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Logout user by clearing the tokens from local storage
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  // Handle errors from HTTP requests
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (error.status === 200) {
      // Status 200 with an error might indicate a parsing issue
      errorMessage = `Parsing error: ${error.error}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}\nMessage: ${error.message}`;
    }
  
    // Log the full error response for debugging
    console.error('Error details:', error);
  
    return throwError(errorMessage);
  }
  
}


  
 

