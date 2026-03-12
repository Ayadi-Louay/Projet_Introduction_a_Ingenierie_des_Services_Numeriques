import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>Créer un compte</h1>
            <p>Rejoignez Salemty-TN pour suivre l'état de santé en Tunisie</p>
          </div>

          <div *ngIf="errorMessage" class="error-alert">
            ❌ {{ errorMessage }}
          </div>

          <form class="auth-form" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">Prénom</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  [(ngModel)]="formData.firstName" 
                  required
                  placeholder="Jean"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="lastName">Nom</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  [(ngModel)]="formData.lastName" 
                  required
                  placeholder="Dupont"
                  class="form-control"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                [(ngModel)]="formData.email" 
                required
                placeholder="votre.email@example.com"
                class="form-control"
              >
            </div>

            <div class="form-group">
              <label for="phone">Téléphone (optionnel)</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                [(ngModel)]="formData.phone"
                placeholder="+216 XX XXX XXX"
                class="form-control"
              >
            </div>

            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                [(ngModel)]="formData.password" 
                required
                placeholder="••••••••"
                class="form-control"
              >
              <div class="password-strength">
                <div class="strength-bar">
                  <div class="strength-fill" [style.width.%]="passwordStrength"></div>
                </div>
                <span class="strength-text">{{ passwordStrengthText }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirmer le mot de passe</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                [(ngModel)]="formData.confirmPassword" 
                required
                placeholder="••••••••"
                class="form-control"
                [class.error]="formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword"
              >
              <div *ngIf="formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword" class="error-message">
                Les mots de passe ne correspondent pas
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-container">
                <input type="checkbox" name="agreeTerms" [(ngModel)]="formData.agreeTerms" required>
                <span class="checkmark"></span>
                J'accepte les <a href="#" class="terms-link">conditions d'utilisation</a> et la <a href="#" class="terms-link">politique de confidentialité</a>
              </label>
            </div>

            <div class="form-group">
              <label class="checkbox-container">
                <input type="checkbox" name="newsletter" [(ngModel)]="formData.newsletter">
                <span class="checkmark"></span>
                Je souhaite recevoir des notifications et des mises à jour par email
              </label>
            </div>

            <button type="submit" class="btn-primary" [disabled]="isLoading || !isFormValid()">
              <span *ngIf="!isLoading">Créer mon compte</span>
              <span *ngIf="isLoading" class="loading-spinner"></span>
            </button>
          </form>

          <div class="auth-divider">
            <span>OU</span>
          </div>

          <div class="social-auth">
            <button class="btn-social btn-google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              S'inscrire avec Google
            </button>
            <button class="btn-social btn-facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              S'inscrire avec Facebook
            </button>
          </div>

          <div class="auth-footer">
            <p>Déjà un compte? <a routerLink="/signin">Se connecter</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .auth-container {
      width: 100%;
      max-width: 500px;
    }

    .auth-card {
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 2.5rem;
      border: 1px solid #e5e7eb;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-header h1 {
      color: #1f2937;
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .auth-header p {
      color: #6b7280;
      font-size: 1rem;
    }

    .auth-form {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      color: #374151;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .form-control:focus {
      outline: none;
      border-color: #E70013;
      box-shadow: 0 0 0 3px rgba(231, 0, 19, 0.1);
    }

    .form-control.error {
      border-color: #ef4444;
    }

    .password-strength {
      margin-top: 0.5rem;
    }

    .strength-bar {
      height: 4px;
      background: #e5e7eb;
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 0.25rem;
    }

    .strength-fill {
      height: 100%;
      transition: width 0.3s ease, background-color 0.3s ease;
    }

    .strength-text {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .checkbox-container {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      font-size: 0.875rem;
      color: #4b5563;
      line-height: 1.5;
    }

    .checkbox-container input {
      margin-right: 0.5rem;
      margin-top: 0.125rem;
    }

    .terms-link {
      color: #E70013;
      text-decoration: none;
    }

    .terms-link:hover {
      text-decoration: underline;
    }

    .btn-primary {
      width: 100%;
      background: #E70013;
      color: white;
      border: none;
      padding: 0.875rem 1rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease-in-out;
    }

    .btn-primary:hover:not(:disabled) {
      background: #d90010;
    }

    .btn-primary:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .auth-divider {
      text-align: center;
      margin: 1.5rem 0;
      position: relative;
    }

    .auth-divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e5e7eb;
    }

    .auth-divider span {
      background: white;
      padding: 0 1rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .social-auth {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .btn-social {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      background: white;
      color: #374151;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
    }

    .btn-social:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .auth-footer {
      text-align: center;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .auth-footer a {
      color: #E70013;
      text-decoration: none;
      font-weight: 500;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    .error-alert {
      background-color: #fee2e2;
      border: 1px solid #fecaca;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1.5rem;
      color: #dc2626;
      font-size: 0.875rem;
    }

    @media (max-width: 640px) {
      .auth-page {
        padding: 1rem;
      }

      .auth-card {
        padding: 1.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SignupComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: false
  };

  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  get passwordStrength(): number {
    if (!this.formData.password) return 0;
    
    let strength = 0;
    if (this.formData.password.length >= 8) strength += 25;
    if (this.formData.password.length >= 12) strength += 25;
    if (/[A-Z]/.test(this.formData.password)) strength += 25;
    if (/[0-9]/.test(this.formData.password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(this.formData.password)) strength += 12.5;
    
    return Math.min(strength, 100);
  }

  get passwordStrengthText(): string {
    const strength = this.passwordStrength;
    if (strength === 0) return '';
    if (strength <= 25) return 'Faible';
    if (strength <= 50) return 'Moyen';
    if (strength <= 75) return 'Fort';
    return 'Très fort';
  }

  get strengthColor(): string {
    const strength = this.passwordStrength;
    if (strength <= 25) return '#ef4444';
    if (strength <= 50) return '#f59e0b';
    if (strength <= 75) return '#3b82f6';
    return '#10b981';
  }

  isFormValid(): boolean {
    return !!(
      this.formData.firstName &&
      this.formData.lastName &&
      this.formData.email &&
      this.formData.password &&
      this.formData.confirmPassword &&
      this.formData.agreeTerms &&
      this.formData.password === this.formData.confirmPassword &&
      this.passwordStrength >= 50
    );
  }

  onSubmit(): void {
    if (this.isLoading || !this.isFormValid()) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          console.log('✅ Inscription réussie:', response.message);
          // Rediriger vers l'accueil
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.message || 'Erreur lors de l\'inscription';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Erreur d\'inscription:', error);
        this.errorMessage = error?.error?.message || 'Impossible de se connecter au serveur';
      }
    });
  }
}
