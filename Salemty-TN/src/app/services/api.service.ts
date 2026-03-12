import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      headers = headers.set('Authorization', '');
    }
    
    return { headers };
  }

  submitReport(data: any) {
    console.log('Sending report:', data);
    return this.http.post(`${this.baseUrl}/health/reports/submit`, data, this.getAuthHeaders());
  }

  // other API methods can be added here as needed
}
