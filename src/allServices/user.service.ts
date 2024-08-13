import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../allModels/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/v1/users';

  constructor(private httpClient: HttpClient) { }

  public getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  public getSingleUserAPI(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }

  public getDeleteAPI(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }
 
}
