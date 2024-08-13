import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Project } from '../allModels/project';
import { AuthServiceService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8081/api/v1/projects';

  
  constructor(private httpClient: HttpClient, 
    
  
  ) { }

  // get employee list here
  public getProjectList():Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.apiUrl}`);

  }
  // get Single Employee API
  public getSinleProjAPI(id:number):Observable<Project>{
    return this.httpClient.get<Project>(`${this.apiUrl}/${id}`);
  }
 // Get a single project by ID
 


  // create save employee API method here as like controler
  public createProject(project:Project):Observable<Project>{
    return this.httpClient.post<Project>(`${this.apiUrl}`,project);
  }

  // create upadte employee API method here
  public updateProject(id:number,project:Project):Observable<Project>{
    return this.httpClient.put<Project>(`${this.apiUrl}/${id}`, project);

  }
  // updateEmployee( data:any): Observable<any> {
  //   return this.httpClient.put<any>(`${this.apiUrl}`, data);
  // }

    //Delete Employee API method here
public deleteProjectApi(id:number):Observable<any>{
  return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
}  

}
