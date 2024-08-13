import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8081/api/v1/reports'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  generateReport(format: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf' // Adjust if you're generating other formats like Excel
    });

    return this.http.get(`${this.baseUrl}/${format}`, { headers: headers, responseType: 'blob' });
  }
}