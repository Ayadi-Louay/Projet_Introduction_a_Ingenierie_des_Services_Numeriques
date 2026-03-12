# Frontend Integration Guide

## Configuration Angular

### 1. Environment Configuration

```typescript
// src/environments/environment.ts
export const environment = {
  apiUrl: "http://localhost:8080/api",
  production: false,
};

// src/environments/environment.prod.ts
export const environment = {
  apiUrl: "https://your-backend-domain.com/api",
  production: true,
};
```

### 2. API Service

```typescript
// src/app/services/api.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Auth
  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  verifyEmail(token: string) {
    return this.http.post(
      `${this.baseUrl}/auth/verify-email`,
      {},
      { params: { token } },
    );
  }

  forgotPassword(email: string) {
    return this.http.post(
      `${this.baseUrl}/auth/forgot-password`,
      {},
      { params: { email } },
    );
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string) {
    return this.http.post(
      `${this.baseUrl}/auth/reset-password`,
      { newPassword, confirmPassword },
      { params: { token } },
    );
  }

  getMe() {
    return this.http.get(`${this.baseUrl}/auth/me`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Health
  submitReport(data: any) {
    return this.http.post(`${this.baseUrl}/health/reports/submit`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getReports(status?: string, governorate?: string) {
    let params: any = {};
    if (status) params.status = status;
    if (governorate) params.governorate = governorate;

    return this.http.get(`${this.baseUrl}/health/reports`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }

  getTrends() {
    return this.http.get(`${this.baseUrl}/health/trends`, {
      headers: this.getAuthHeaders(),
    });
  }

  getStats() {
    return this.http.get(`${this.baseUrl}/health/stats`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAlerts() {
    return this.http.get(`${this.baseUrl}/health/alerts`, {
      headers: this.getAuthHeaders(),
    });
  }

  // User
  getProfile() {
    return this.http.get(`${this.baseUrl}/users/profile`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateProfile(data: any) {
    return this.http.put(`${this.baseUrl}/users/profile`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteAccount() {
    return this.http.delete(`${this.baseUrl}/users/account`, {
      headers: this.getAuthHeaders(),
    });
  }

  getNotifications() {
    return this.http.get(`${this.baseUrl}/users/notifications`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Admin
  getUsers() {
    return this.http.get(`${this.baseUrl}/admin/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  validateReport(reportId: string, status: string) {
    return this.http.put(
      `${this.baseUrl}/admin/reports/${reportId}/validate`,
      {},
      { headers: this.getAuthHeaders(), params: { status } },
    );
  }

  createAlert(data: any) {
    return this.http.post(`${this.baseUrl}/admin/alerts`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  generateReport() {
    return this.http.get(`${this.baseUrl}/admin/reports/generate`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Helper method
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }
}
```

### 3. Auth Service

```typescript
// src/app/services/auth.service.ts
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  login(email: string, password: string) {
    return this.api.login({ email, password }).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("userEmail", res.data.email);
        this.router.navigate(["/home"]);
      }
    });
  }

  register(data: any) {
    return this.api.register(data);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    this.router.navigate(["/signin"]);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): string {
    return localStorage.getItem("token") || "";
  }
}
```

### 4. HTTP Interceptor (Optional but Recommended)

```typescript
// src/app/interceptors/auth.interceptor.ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}

// Add to app.config.ts
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
```

### 5. Guard de Route

```typescript
// src/app/guards/auth.guard.ts
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(["/signin"]);
    return false;
  }
}

// Utilisation dans les routes
const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "carte", component: CarteComponent, canActivate: [AuthGuard] },
  { path: "profil", component: ProfilComponent, canActivate: [AuthGuard] },
];
```

## Integration Examples

### Signup Component

```typescript
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
})
export class SignupComponent {
  form = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    governorate: "",
    postalCode: "",
  };

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  register() {
    this.api.register(this.form).subscribe((res: any) => {
      if (res.success) {
        alert("Vérifiez votre email pour confirmer");
        this.router.navigate(["/signin"]);
      }
    });
  }
}
```

### Signaler Component (Health Report)

```typescript
import { Component } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-signaler",
  templateUrl: "./signaler.component.html",
})
export class SignalerComponent {
  form = {
    symptoms: "",
    symptomList: [],
    description: "",
    severity: "MILD",
    location: "",
    latitude: "",
    longitude: "",
    governorate: "",
    anonymous: false,
  };

  constructor(private api: ApiService) {}

  submitReport() {
    this.api.submitReport(this.form).subscribe((res: any) => {
      if (res.success) {
        alert("Signalement soumis avec succès");
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.form = {
      symptoms: "",
      symptomList: [],
      description: "",
      severity: "MILD",
      location: "",
      latitude: "",
      longitude: "",
      governorate: "",
      anonymous: false,
    };
  }
}
```

### Carte Component (Interactive Map)

```typescript
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-carte",
  templateUrl: "./carte.component.html",
})
export class CarteComponent implements OnInit {
  reports: any[] = [];
  statistics: any = {};

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadReports();
    this.loadStats();
  }

  loadReports() {
    this.api.getReports().subscribe((res: any) => {
      if (res.success) {
        this.reports = res.data;
      }
    });
  }

  loadStats() {
    this.api.getStats().subscribe((res: any) => {
      if (res.success) {
        this.statistics = res.data;
      }
    });
  }
}
```

## CORS Configuration

Le backend est configuré pour accepter les requêtes de:

- `http://localhost:4200` (Angular Dev Server)
- `http://localhost:3000` (Alternative Dev Server)

## Notes Importantes

1. Assurez-vous que le backend s'exécute avant de démarrer l'Angular app
2. Utilisez les variables d'environnement pour les URLs différentes
3. Stockez le token de manière sécurisée (attention aux XSS)
4. Implémentez un refresh token en production
5. Garez les données sensibles du côté backend
