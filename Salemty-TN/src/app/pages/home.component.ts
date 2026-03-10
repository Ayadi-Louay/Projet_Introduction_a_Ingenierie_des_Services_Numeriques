import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container hero-content-wrapper">
          <div class="hero-left">
            <div class="hero-badge">
              <span>♥</span>
              <span>صحتي تونسي · Votre santé, notre priorité</span>
            </div>
            <h1>Surveillance épidémiologique collaborative en Tunisie</h1>
            <p>Salemty TN est une plateforme citoyenne qui permet de détecter et anticiper les risques sanitaires en Tunisie grâce à vos signalements.</p>
            <div class="hero-buttons">
              <a routerLink="/signaler" class="btn btn-primary-large">
                <span class="btn-icon">⚠</span>
                <span>Signaler mes symptômes</span>
              </a>
              <a routerLink="/carte" class="btn btn-secondary-large">
                <span class="btn-icon">📍</span>
                <span>Voir la carte</span>
              </a>
            </div>
          </div>
          
          <div class="hero-right">
            <div class="hero-image">
              <div class="image-placeholder">
                👨‍⚕️
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Section in Hero -->
        <div class="container stats-container">
          <div class="stat-card">
            <div class="stat-label">Signalements aujourd'hui</div>
            <div class="stat-value">247</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Régions surveillées</div>
            <div class="stat-value">24</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Alertes actives</div>
            <div class="stat-value">3</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Citoyens engagés</div>
            <div class="stat-value">12,450</div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works">
        <div class="container">
          <h2>Comment ça marche ?</h2>
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-number">1</div>
              <h3>Signalez</h3>
              <p>Remplissez un formulaire simple avec vos symptômes et votre localisation (entièrement anonyme)</p>
            </div>
            <div class="step-card">
              <div class="step-number">2</div>
              <h3>Analysez</h3>
              <p>Nos systèmes analysent les données en temps réel pour détecter les tendances de santé</p>
            </div>
            <div class="step-card">
              <div class="step-number">3</div>
              <h3>Prévenez</h3>
              <p>Recevez des alertes et des conseils de prévention adaptés à votre région</p>
            </div>
            <div class="step-card">
              <div class="step-number">4</div>
              <h3>Protégez</h3>
              <p>Les autorités sanitaires peuvent agir rapidement pour protéger la population</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Active Alerts Section -->
      <section class="alerts-section">
        <div class="container">
          <h2>Alertes actives</h2>
          <div class="alerts-grid">
            <div class="alert-card alert-high">
              <div class="alert-badge">🔴 Élevé</div>
              <h3>Grippe saisonnière</h3>
              <p class="region"><strong>Tunis</strong></p>
              <p class="count">324 signalements cette semaine</p>
              <button class="btn btn-outline btn-sm">En savoir plus</button>
            </div>
            <div class="alert-card alert-medium">
              <div class="alert-badge">🟡 Modéré</div>
              <h3>Gastro-entérite</h3>
              <p class="region"><strong>Sousse</strong></p>
              <p class="count">156 signalements cette semaine</p>
              <button class="btn btn-outline btn-sm">En savoir plus</button>
            </div>
            <div class="alert-card alert-low">
              <div class="alert-badge">🟢 Faible</div>
              <h3>Allergie saisonnière</h3>
              <p class="region"><strong>Sfax</strong></p>
              <p class="count">42 signalements cette semaine</p>
              <button class="btn btn-outline btn-sm">En savoir plus</button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container cta-content">
          <h2>Prêt à contribuer à la santé publique ?</h2>
          <p>Chaque signalement compte. Aidez-nous à construire une meilleure surveillance de la santé en Tunisie.</p>
          <a routerLink="/signaler" class="btn btn-primary-large">
            Commencer maintenant
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home {
      min-height: 100vh;
    }

    /* Hero Section */
    .hero {
      background: linear-gradient(135deg, #E70013 0%, #d90010 100%);
      color: white;
      padding: 4rem 0 2rem;
      position: relative;
    }

    .hero-content-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 3rem;
      margin-bottom: 3rem;
    }

    .hero-left h1 {
      color: white;
      font-size: 3rem;
      margin-bottom: 1rem;
      line-height: 1.2;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .hero-left p {
      color: rgba(255, 255, 255, 0.95);
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: rgba(255, 255, 255, 0.2);
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
      font-weight: 500;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn-primary-large,
    .btn-secondary-large {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-primary-large {
      background-color: white;
      color: #E70013;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .btn-primary-large:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    }

    .btn-secondary-large {
      background-color: rgba(255, 255, 255, 0.15);
      color: white;
      border: 2px solid white;
    }

    .btn-secondary-large:hover {
      background-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }

    .btn-icon {
      font-size: 1.25rem;
    }

    .hero-right {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero-image {
      width: 100%;
      max-width: 400px;
    }

    .image-placeholder {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 1rem;
      padding: 3rem;
      text-align: center;
      font-size: 8rem;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Stats Container */
    .stats-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.75rem;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .stat-label {
      font-size: 0.85rem;
      color: #6b7280;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #E70013;
    }

    /* How It Works */
    .how-it-works {
      padding: 4rem 0;
      background-color: #f9fafb;
    }

    .how-it-works h2 {
      text-align: center;
      margin-bottom: 3rem;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .step-card {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .step-card:hover {
      box-shadow: 0 8px 16px rgba(231, 0, 19, 0.15);
      transform: translateY(-5px);
    }

    .step-number {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #E70013, #b3000f);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      font-weight: bold;
      margin: 0 auto 1rem;
    }

    .step-card h3 {
      color: #E70013;
      margin-bottom: 0.75rem;
    }

    .step-card p {
      color: #6b7280;
      font-size: 0.95rem;
    }

    /* Alerts Section */
    .alerts-section {
      padding: 4rem 0;
    }

    .alerts-section h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .alerts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .alert-card {
      padding: 2rem;
      border-radius: 0.75rem;
      border-left: 5px solid;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .alert-high {
      border-left-color: #E70013;
      background-color: rgba(231, 0, 19, 0.03);
    }

    .alert-medium {
      border-left-color: #f59e0b;
      background-color: rgba(245, 158, 11, 0.03);
    }

    .alert-low {
      border-left-color: #10b981;
      background-color: rgba(16, 185, 129, 0.03);
    }

    .alert-badge {
      display: inline-block;
      font-weight: 600;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
    }

    .alert-card h3 {
      margin-bottom: 0.5rem;
    }

    .region {
      color: #E70013;
      font-weight: 600;
      margin: 0.5rem 0;
    }

    .count {
      font-size: 0.9rem;
      color: #6b7280;
      margin-bottom: 1rem;
    }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, #E70013 0%, #d90010 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }

    .cta-content h2 {
      color: white;
      margin-bottom: 1rem;
      font-size: 2.5rem;
    }

    .cta-content p {
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 2rem;
      font-size: 1.1rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Responsive */
    @media (max-width: 968px) {
      .hero-content-wrapper {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .hero-left h1 {
        font-size: 2rem;
      }

      .stats-container {
        grid-template-columns: repeat(2, 1fr);
      }

      .steps-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .hero {
        padding: 2rem 0 1.5rem;
      }

      .hero-left h1 {
        font-size: 1.5rem;
      }

      .hero-buttons {
        flex-direction: column;
      }

      .btn-primary-large,
      .btn-secondary-large {
        width: 100%;
        justify-content: center;
      }

      .stats-container {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .stat-card {
        padding: 1rem;
      }

      .cta-content h2 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class HomeComponent { }
