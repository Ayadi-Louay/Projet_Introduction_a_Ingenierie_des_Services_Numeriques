import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <a routerLink="/">
            <div class="logo-heart">♥</div>
            <div class="logo-content">
              <div class="logo-name">Salemty TN</div>
              <div class="logo-subtitle">صحتي تونسي</div>
            </div>
          </a>
        </div>
        
        <nav class="nav" [class.active]="mobileMenuOpen()">
          <a routerLink="/" 
             routerLinkActive="active" 
             [routerLinkActiveOptions]="{ exact: true }"
             class="nav-link">
            Accueil
          </a>
          <a *ngIf="authService.isAuthenticated()" routerLink="/signaler" 
             routerLinkActive="active"
             class="nav-link">
            Signaler
          </a>
          <a routerLink="/carte" 
             routerLinkActive="active"
             class="nav-link">
            Carte
          </a>
          <a routerLink="/previsions" 
             routerLinkActive="active"
             class="nav-link">
            Prévisions
          </a>
          <a routerLink="/prevention" 
             routerLinkActive="active"
             class="nav-link">
            Prévention
          </a>
          <a *ngIf="authService.isAuthenticated()" routerLink="/profil" 
             routerLinkActive="active"
             class="nav-link">
            Profil
          </a>
          <div class="auth-buttons">
            <ng-container *ngIf="authService.isAuthenticated()">
              <div class="user-menu">
                <span class="user-name">{{ authService.currentUser()?.firstName }} {{ authService.currentUser()?.lastName }}</span>
                <button (click)="logout()" class="btn-logout">Déconnexion</button>
              </div>
            </ng-container>
            <ng-container *ngIf="!authService.isAuthenticated()">
              <a routerLink="/signin" class="btn-signin">Se connecter</a>
              <a routerLink="/signup" class="btn-signup">S'inscrire</a>
            </ng-container>
          </div>
        </nav>

        <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-label]="'Menu'">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: white;
      border-bottom: 2px solid #f0f0f0;
      padding: 0.75rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo a {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: #1f2937;
    }

    .logo-heart {
      font-size: 2rem;
      background: linear-gradient(135deg, #E70013, #d90010);
      width: 60px;
      height: 60px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(231, 0, 19, 0.2);
    }

    .logo-content {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .logo-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .logo-subtitle {
      font-size: 0.75rem;
      color: #E70013;
      font-weight: 600;
    }

    .nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .auth-buttons {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      margin-left: 1rem;
    }

    .btn-signin, .btn-signup {
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .btn-signin {
      color: #E70013;
      border: 1px solid #E70013;
    }

    .btn-signin:hover {
      background-color: #E70013;
      color: white;
    }

    .btn-signup {
      background-color: #E70013;
      color: white;
    }

    .btn-signup:hover {
      background-color: #d90010;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(231, 0, 19, 0.3);
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-left: 1rem;
      border-left: 1px solid #e5e7eb;
    }

    .user-name {
      font-weight: 600;
      color: #1f2937;
      font-size: 0.9rem;
    }

    .btn-logout {
      background: none;
      border: 1px solid #e5e7eb;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      color: #6b7280;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .btn-logout:hover {
      background-color: #fee2e2;
      border-color: #fecaca;
      color: #dc2626;
    }

    .nav-link {
      color: #6b7280;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      white-space: nowrap;
    }

    .nav-link:hover {
      color: #E70013;
      background-color: rgba(231, 0, 19, 0.05);
    }

    .nav-link.active {
      color: #E70013;
      font-weight: 600;
      background-color: rgba(231, 0, 19, 0.08);
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      gap: 0.4rem;
      padding: 0.5rem;
    }

    .menu-toggle span {
      width: 25px;
      height: 3px;
      background-color: #1f2937;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    @media (max-width: 968px) {
      .menu-toggle {
        display: flex;
      }

      .nav {
        position: absolute;
        top: 90px;
        left: 0;
        right: 0;
        background-color: white;
        flex-direction: column;
        gap: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
        border-bottom: 2px solid #f0f0f0;
      }

      .nav.active {
        max-height: 500px;
        padding: 1rem 0;
      }

      .nav-link {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #f0f0f0;
        width: 100%;
      }

      .auth-buttons {
        flex-direction: column;
        gap: 0.5rem;
        margin-left: 0;
        margin-top: 1rem;
        padding: 0 1.5rem;
        width: 100%;
      }

      .btn-signin, .btn-signup {
        width: 100%;
        text-align: center;
        padding: 0.75rem 1rem;
      }
    }
  `]
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  logout() {
    this.authService.logout();
    this.mobileMenuOpen.set(false);
  }
}
