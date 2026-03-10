import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-previsions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="previsions-page">
      <div class="container">
        <h1>Prévisions de santé</h1>
        <p class="subtitle">Tendances prévues pour les 7 prochains jours</p>

        <div class="controls">
          <select class="filter-select">
            <option value="Tunis">Tunis</option>
            <option value="Sfax">Sfax</option>
            <option value="Sousse">Sousse</option>
          </select>
          <div class="time-range">
            <button class="time-btn active">7 jours</button>
            <button class="time-btn">30 jours</button>
          </div>
        </div>

        <div class="forecast-grid">
          <div class="forecast-card">
            <h3>Grippe</h3>
            <div class="chart-placeholder">
              Graphique de tendance
            </div>
            <div class="forecast-status">
              <span class="trend-up">+15% cette semaine</span>
              <p class="small">Prévision: Augmentation légère</p>
            </div>
          </div>

          <div class="forecast-card">
            <h3>Gastro-entérite</h3>
            <div class="chart-placeholder">
              📊 Graphique de tendance
            </div>
            <div class="forecast-status">
              <span class="trend-down">-8% cette semaine</span>
              <p class="small">Prévision: Baisse progressive</p>
            </div>
          </div>

          <div class="forecast-card">
            <h3>Allergie</h3>
            <div class="chart-placeholder">
              📊 Graphique de tendance
            </div>
            <div class="forecast-status">
              <span class="trend-stable">Stable</span>
              <p class="small">Prévision: Peu de variation</p>
            </div>
          </div>
        </div>

        <div class="recommendations">
          <h2>Recommandations personnalisées</h2>
          <div class="recommendation-items">
            <div class="rec-item">
              <span class="rec-icon">~</span>
              <div>
                <h4>Hydratation</h4>
                <p>Augmentez votre consommation d'eau debido à l'augmentation des cas de gastro-entérite.</p>
              </div>
            </div>
            <div class="rec-item">
              <span class="rec-icon">+</span>
              <div>
                <h4>Consultations</h4>
                <p>Si vous avez de la fièvre persistante, consultez un médecin rapidement.</p>
              </div>
            </div>
            <div class="rec-item">
              <span class="rec-icon">◆</span>
              <div>
                <h4>Hygiène</h4>
                <p>Lavez-vous les mains régulièrement et portez un masque en espace clos.</p>
              </div>
            </div>
            <div class="rec-item">
              <span class="rec-icon">■</span>
              <div>
                <h4>Vaccination</h4>
                <p>Vérifiez que vos vaccins sont à jour, particulièrement contre la grippe.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .previsions-page {
      padding: 3rem 0;
      background-color: #f9fafb;
      min-height: 100vh;
    }

    .container h1 {
      text-align: center;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      text-align: center;
      color: #6b7280;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-select {
      min-width: 200px;
      padding: 0.75rem;
      border: 2px solid #E70013;
      border-radius: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
    }

    .time-range {
      display: flex;
      gap: 1rem;
    }

    .time-btn {
      padding: 0.5rem 1.5rem;
      border: 2px solid #e5e7eb;
      background: white;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .time-btn.active {
      border-color: #E70013;
      background-color: #E70013;
      color: white;
    }

    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .forecast-card {
      background: white;
      border-radius: 0.75rem;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border-top: 4px solid #E70013;
    }

    .forecast-card h3 {
      margin-bottom: 1.5rem;
      color: #E70013;
    }

    .chart-placeholder {
      background: linear-gradient(135deg, #f0f0f0 0%, #e5e7eb 100%);
      height: 200px;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .forecast-status {
      color: #6b7280;
    }

    .trend-up {
      color: #10b981;
      font-weight: 600;
      display: block;
      margin-bottom: 0.25rem;
    }

    .trend-down {
      color: #f59e0b;
      font-weight: 600;
      display: block;
      margin-bottom: 0.25rem;
    }

    .trend-stable {
      color: #3b82f6;
      font-weight: 600;
      display: block;
      margin-bottom: 0.25rem;
    }

    .small {
      font-size: 0.9rem;
      margin: 0;
    }

    .recommendations {
      background: white;
      border-radius: 0.75rem;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .recommendations h2 {
      margin-bottom: 2rem;
      text-align: center;
    }

    .recommendation-items {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .rec-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-left: 4px solid #E70013;
      background-color: rgba(231, 0, 19, 0.02);
      border-radius: 0.5rem;
    }

    .rec-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .rec-item h4 {
      margin: 0 0 0.5rem 0;
      color: #E70013;
    }

    .rec-item p {
      margin: 0;
      color: #6b7280;
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-select {
        width: 100%;
      }

      .time-range {
        justify-content: center;
      }

      .recommendation-items {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PrevisionComponent { }
