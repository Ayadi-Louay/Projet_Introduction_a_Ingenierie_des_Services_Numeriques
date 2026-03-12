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

// login/register endpoints return LoginResponse structure
export interface LoginResponse {
  token: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: LoginResponse;
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

  // simple guard to ensure code only touches localStorage in browser context
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private initializeFromStorage(): void {
    if (!this.isBrowser()) {
      return; // nothing to load on server or non-browser env
    }

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
            const lr = response.data;
            const user: User = {
              id: lr.userId,
              firstName: lr.firstName,
              lastName: lr.lastName,
              email: lr.email,
            };
            this.setAuth(lr.token, user);
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
            const lr = response.data;
            const user: User = {
              id: lr.userId,
              firstName: lr.firstName,
              lastName: lr.lastName,
              email: lr.email,
            };
            this.setAuth(lr.token, user);
          }
        })
      );
  }

  logout(): void {
    this.clearAuth();
  }

  private setAuth(token: string, user: User): void {
    if (this.isBrowser()) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private clearAuth(): void {
    if (this.isBrowser()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    return localStorage.getItem("token");
  }
}
