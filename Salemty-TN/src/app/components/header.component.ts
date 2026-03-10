import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

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
          <a routerLink="/signaler" 
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
          <a routerLink="/profil" 
             routerLinkActive="active"
             class="nav-link">
            Profil
          </a>
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
    }
  `]
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);

  toggleMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }
}
