import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carte-page">
      <div class="container">
        <h1>Carte de santé interactive</h1>
        <p class="subtitle">Vue d'ensemble des signalements en Tunisie</p>

        <div class="controls">
          <div class="legend">
            <div class="legend-item">
              <span class="dot" style="background-color: #10b981;"></span>
              <span>Faible (0-50)</span>
            </div>
            <div class="legend-item">
              <span class="dot" style="background-color: #f59e0b;"></span>
              <span>Modéré (50-150)</span>
            </div>
            <div class="legend-item">
              <span class="dot" style="background-color: #E70013;"></span>
              <span>Élevé (150+)</span>
            </div>
          </div>
        </div>

        <div class="map-container">
          <img src="/tunisia-map.png" alt="Carte de Tunisie" class="tunisia-map" />
          <div class="map-overlay">
            <div class="overlay-info">
              <h3>Carte de surveillance des maladies</h3>
              <p>Visualisation des signalements sur le territoire tunisien</p>
            </div>
          </div>
        </div>

        <div class="regions-stats">
          <h2>Statistiques par gouvernorat</h2>
          <div class="regions-grid">
            <div *ngFor="let region of regions" [class]="'region-card region-' + region.level">
              <div class="region-header">
                <h3>{{ region.name }}</h3>
                <span class="badge">{{ region.level === 'high' ? 'HAUT' : region.level === 'medium' ? 'MOYEN' : 'BAS' }}</span>
              </div>
              <div class="region-stat">
                <span class="number">{{ region.count }}</span>
                <span class="label">signalements</span>
              </div>
              <div class="region-disease">
                Maladie dominante: <strong>{{ region.disease }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .carte-page {
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
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .legend {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .map-container {
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      margin-bottom: 3rem;
      height: 500px;
      border: 1px solid #e5e7eb;
      position: relative;
    }

    .tunisia-map {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .map-overlay {
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(255, 255, 255, 0.95);
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      max-width: 300px;
    }

    .overlay-info h3 {
      margin: 0 0 0.5rem 0;
      color: #E70013;
      font-size: 1.1rem;
    }

    .overlay-info p {
      margin: 0;
      color: #6b7280;
      font-size: 0.9rem;
    }

    .regions-stats h2 {
      margin-bottom: 2rem;
      text-align: center;
    }

    .regions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .region-card {
      background: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border-left: 4px solid;
      transition: all 0.3s ease;
    }

    .region-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    }

    .region-high {
      border-left-color: #E70013;
      background-color: rgba(231, 0, 19, 0.02);
    }

    .region-medium {
      border-left-color: #f59e0b;
      background-color: rgba(245, 158, 11, 0.02);
    }

    .region-low {
      border-left-color: #10b981;
      background-color: rgba(16, 185, 129, 0.02);
    }

    .region-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .region-header h3 {
      margin: 0;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      background-color: rgba(231, 0, 19, 0.1);
      color: #E70013;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .region-stat {
      margin-bottom: 1rem;
    }

    .number {
      display: block;
      font-size: 2rem;
      font-weight: bold;
      color: #E70013;
    }

    .label {
      font-size: 0.9rem;
      color: #6b7280;
    }

    .region-disease {
      font-size: 0.9rem;
      color: #6b7280;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
        align-items: center;
      }

      .legend {
        justify-content: center;
      }

      .map-container {
        height: 300px;
      }

      .regions-grid {
        grid-template-columns: 1fr;
      }
    }

  `]
})
export class CarteComponent implements OnInit {
  constructor() {}

  regions = [
    { name: 'Tunis', lat: 36.8065, lng: 10.1815, count: 324, level: 'high', disease: 'Grippe' },
    { name: 'Sfax', lat: 34.7405, lng: 10.7603, count: 156, level: 'medium', disease: 'Gastro-entérite' },
    { name: 'Sousse', lat: 35.8256, lng: 10.6369, count: 89, level: 'medium', disease: 'Allergie' },
    { name: 'Kairouan', lat: 35.6781, lng: 9.9197, count: 45, level: 'low', disease: 'Rhume' },
    { name: 'Gabès', lat: 33.8869, lng: 10.0994, count: 23, level: 'low', disease: 'Rhume' },
    { name: 'Gafsa', lat: 34.4257, lng: 8.7839, count: 178, level: 'high', disease: 'Grippe' },
    { name: 'Kébili', lat: 33.7067, lng: 8.9706, count: 12, level: 'low', disease: 'Allergie' },
    { name: 'Kasserine', lat: 35.1675, lng: 8.8336, count: 67, level: 'medium', disease: 'Gastro-entérite' },
    { name: 'Tataouine', lat: 32.9305, lng: 10.4549, count: 34, level: 'low', disease: 'Rhume' }
  ];

  ngOnInit(): void {
    console.log('Carte component initialized with static map');
  }
}