import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>À propos de Salemty TN</h4>
            <p>Plateforme citoyenne de surveillance épidémiologique en Tunisie. Signalezvos symptômes et aidez-nous à prévenir ensemble.</p>
            <div class="footer-social">
              <a href="#" title="Facebook">f</a>
              <a href="#" title="Twitter">𝕏</a>
              <a href="#" title="LinkedIn">in</a>
            </div>
          </div>

          <div class="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><a routerLink="/">Accueil</a></li>
              <li><a routerLink="/signaler">Signaler</a></li>
              <li><a routerLink="/carte">Carte</a></li>
              <li><a routerLink="/previsions">Prévisions</a></li>
              <li><a routerLink="/prevention">Prévention</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Informations</h4>
            <ul>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Mentions légales</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Urgences médicales</h4>
            <p><strong>SAMU:</strong> 15</p>
            <p><strong>Urgences:</strong> +216 71 862 000</p>
            <p style="font-size: 0.9rem; margin-top: 1rem;">Disponible 24h/24, 7j/7</p>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 Salemty TN. Tous droits réservés.</p>
          <p>Plateforme de surveillance de la santé publique en Tunisie · صحتي تونسي</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #1f2937;
      color: #e5e7eb;
      padding: 3rem 0 1rem;
      margin-top: 3rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h4 {
      color: white;
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .footer-section p {
      color: #d1d5db;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section li {
      margin-bottom: 0.5rem;
    }

    .footer-section a {
      color: #d1d5db;
      text-decoration: none;
      transition: all 0.3s ease;
      font-size: 0.95rem;
    }

    .footer-section a:hover {
      color: #E70013;
      transform: translateX(4px);
    }

    .footer-social {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .footer-social a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(231, 0, 19, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .footer-social a:hover {
      background-color: #E70013;
      color: white;
      transform: translateY(-3px);
    }

    .footer-bottom {
      border-top: 1px solid #374151;
      padding-top: 1.5rem;
      text-align: center;
      font-size: 0.9rem;
      color: #9ca3af;
    }

    .footer-bottom p {
      margin: 0.25rem 0;
    }

    @media (max-width: 768px) {
      .footer {
        padding: 2rem 0 1rem;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class FooterComponent { }
