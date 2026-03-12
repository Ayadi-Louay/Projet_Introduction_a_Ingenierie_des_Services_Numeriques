import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profil-page">
      <div class="container">
        <div class="profile-header">
          <div class="profile-avatar">
            {{ authService.currentUser()?.firstName?.charAt(0) ?? '?' }}
          </div>
          <div class="profile-info">
            <h1>
              {{ authService.currentUser()?.firstName ?? '' }}
              {{ authService.currentUser()?.lastName ?? '' }}
            </h1>
            <p class="profile-status">
              Email: {{ authService.currentUser()?.email ?? '' }}
            </p>
          </div>
        </div>


        <div class="profile-grid">
          <!-- Historique des signalements -->
          <section class="profile-section full-width">
            <h2>Mes signalements</h2>
            <div *ngIf="userReports().length > 0; else noReports" class="reports-list">
              <div *ngFor="let report of userReports()" class="report-item">
                <div class="report-date">{{ report.createdAt | date: 'dd/MM/yyyy' }}</div>
                <div class="report-content">
                  <h3>{{ report.governorate }}</h3>
                  <p><strong>Symptômes:</strong> {{ report.symptoms }}</p>
                  <p><strong>Sévérité:</strong> {{ report.severity }}</p>
                  <p><strong>Description:</strong> {{ report.description || '-' }}</p>
                </div>
                <div class="report-status">✅ Soumis</div>
              </div>
            </div>
            <ng-template #noReports>
              <p class="no-data">Aucun signalement trouvé</p>
            </ng-template>
          </section>

          <!-- Statistiques personnelles -->
          <section class="profile-section">
            <h2>Mes statistiques</h2>
            <div class="stats-box">
              <div class="stat">
                <div class="stat-number">{{ userReports().length }}</div>
                <div class="stat-label">Signalements totaux</div>
              </div>
              <div class="stat">
                <div class="stat-number">{{ uniqueGovernoratesCount() }}</div>
                <div class="stat-label">Régions signalées</div>
              </div>
              <div class="stat">
                <div class="stat-number">100%</div>
                <div class="stat-label">Contributions validées</div>
              </div>
            </div>
          </section>

          <!-- Régions suivies -->
          <section class="profile-section">
            <h2>Régions suivies</h2>
            <div class="regions-list">
              <div class="region-item">
                <h3>Tunis (HAUT)</h3>
                <p>Suivi actif · Risque élevé</p>
                <button class="btn btn-sm btn-outline">Arrêter le suivi</button>
              </div>
              <div class="region-item">
                <h3>Sfax (MOYEN)</h3>
                <p>Suivi actif · Risque modéré</p>
                <button class="btn btn-sm btn-outline">Arrêter le suivi</button>
              </div>
            </div>
          </section>

          <!-- Paramètres de notifications -->
          <section class="profile-section">
            <h2>Paramètres</h2>
            <div class="settings-list">
              <label class="setting-item">
                <input type="checkbox" checked>
                <div>
                  <h4>Alertes de risque élevé</h4>
                  <p>Recevez une notification quand le risque passe à élevé</p>
                </div>
              </label>
              <label class="setting-item">
                <input type="checkbox" checked>
                <div>
                  <h4>Mises à jour quotidiennes</h4>
                  <p>Rapport quotidien sur vos régions suivies</p>
                </div>
              </label>
              <label class="setting-item">
                <input type="checkbox">
                <div>
                  <h4>Conseils saisonniers</h4>
                  <p>Recevez des conseils de prévention adaptés</p>
                </div>
              </label>
              <label class="setting-item">
                <input type="checkbox" checked>
                <div>
                  <h4>Nouvelles ressources</h4>
                  <p>Notification pour les nouvelles ressources de santé</p>
                </div>
              </label>
            </div>
          </section>
        </div>

        <div class="profile-actions">
          <button class="btn btn-primary">Mettre à jour le profil</button>
          <button class="btn btn-outline">Voir la politique de confidentialité</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profil-page {
      padding: 3rem 0;
      background-color: #f9fafb;
      min-height: 100vh;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 3rem;
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .profile-avatar {
      font-size: 3rem;
      background: linear-gradient(135deg, #E70013, #b3000f);
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
    }

    .profile-info h1 {
      margin: 0 0 0.5rem 0;
    }

    .profile-status {
      color: #6b7280;
      margin: 0;
      font-size: 0.95rem;
    }

    .no-data {
      text-align: center;
      color: #9ca3af;
      padding: 2rem;
      font-size: 1rem;
    }

    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .profile-section {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .profile-section.full-width {
      grid-column: 1 / -1;
    }

    .profile-section h2 {
      margin-bottom: 1.5rem;
    }

    .reports-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .report-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }

    .report-item:hover {
      border-color: #E70013;
      background-color: rgba(231, 0, 19, 0.02);
    }

    .report-date {
      font-size: 0.85rem;
      color: #9ca3af;
      white-space: nowrap;
    }

    .report-content {
      flex: 1;
    }

    .report-content h3 {
      margin: 0 0 0.5rem 0;
      color: #E70013;
    }

    .report-content p {
      margin: 0.25rem 0;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .report-status {
      background-color: #d1fae5;
      color: #047857;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .stats-box {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
    }

    .stat {
      text-align: center;
      padding: 1rem;
      background: linear-gradient(135deg, rgba(231, 0, 19, 0.05), rgba(179, 0, 15, 0.05));
      border-radius: 0.5rem;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #E70013;
      display: block;
    }

    .stat-label {
      font-size: 0.85rem;
      color: #6b7280;
    }

    .regions-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .region-item {
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .region-item h3 {
      margin: 0;
      margin-bottom: 0.25rem;
    }

    .region-item p {
      margin: 0;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .settings-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .setting-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .setting-item:hover {
      border-color: #E70013;
      background-color: rgba(231, 0, 19, 0.02);
    }

    .setting-item input {
      width: auto;
      margin: 0;
      cursor: pointer;
      accent-color: #E70013;
    }

    .setting-item h4 {
      margin: 0 0 0.25rem 0;
    }

    .setting-item p {
      margin: 0;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .profile-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }

      .profile-grid {
        grid-template-columns: 1fr;
      }

      .report-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .profile-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProfilComponent implements OnInit {
  userReports = signal<any[]>([]);
  loading = signal(false);

  constructor(
    public authService: AuthService,
    private api: ApiService,
    private router: Router
  ) {
    // Redirect to login if not authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/signin']);
    }
  }

  ngOnInit() {
    this.loadUserReports();
  }

  loadUserReports() {
    this.loading.set(true);
    this.api.getUserReports().subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.userReports.set(res.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading reports:', err);
        this.loading.set(false);
      }
    });
  }

  uniqueGovernoratesCount(): number {
    const governorates = new Set(this.userReports().map(r => r.governorate));
    return governorates.size;
  }
}
