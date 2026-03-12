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
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // debugging aid
    // console.log('auth headers', headers.keys(), headers.get('Authorization'));
    return { headers };
  }

  submitReport(data: any) {
    console.log('Sending report:', data);
    return this.http.post(`${this.baseUrl}/health/reports/submit`, data, this.getAuthHeaders());
  }

  // Fetch all reports for current user
  getUserReports() {
    return this.http.get(`${this.baseUrl}/health/reports/my-reports`, this.getAuthHeaders());
  }

  // other API methods can be added here as needed
}
