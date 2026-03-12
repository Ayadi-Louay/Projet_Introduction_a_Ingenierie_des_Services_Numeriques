import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient) {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch (e) {
        this.clearAuth();
      }
    }
  }

  register(data: any): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/register`, data)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.setAuth(response.data.token, response.data.user);
          }
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.setAuth(response.data.token, response.data.user);
          }
        })
      );
  }

  logout(): void {
    this.clearAuth();
  }

  private setAuth(token: string, user: User): void {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private clearAuth(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
