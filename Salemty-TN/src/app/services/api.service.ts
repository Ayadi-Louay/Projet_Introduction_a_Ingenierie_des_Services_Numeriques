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
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    // header is required by backend but value can be empty if not logged in
    return { Authorization: "" };
  }

  submitReport(data: any) {
    return this.http.post(`${this.baseUrl}/health/reports/submit`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  // other API methods can be added here as needed
}
