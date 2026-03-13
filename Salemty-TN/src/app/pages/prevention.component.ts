import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prevention',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prevention-page">
      <div class="container">
        <h1>Kit de prévention</h1>
        <p class="subtitle">Conseils et ressources pour rester en bonne santé</p>

        <div class="content-grid">
          <!-- Conseils par catégorie -->
          <section class="section">
            <h2>Conseils essentiels</h2>
            <div class="tips-grid">
              <div class="tip-card">
                <div class="tip-icon">◆</div>
                <h3>Hygiène des mains</h3>
                <ul>
                  <li>Lavez-vous les mains pendant 20 secondes</li>
                  <li>Utilisez du savon et de l'eau</li>
                  <li>Avant de manger et après les toilettes</li>
                </ul>
              </div>

              <div class="tip-card">
                <div class="tip-icon">\u2610</div>
                <h3>Port du masque</h3>
                <ul>
                  <li>En cas de symptômes respiratoires</li>
                  <li>Selon les recommandations officielles</li>
                  <li>Changez le masque toutes les 4 heures</li>
                </ul>
              </div>

              <div class="tip-card">
                <div class="tip-icon"><img src="C:/Users/ayadi/Downloads/Projet_Introduction_a_Ingenierie_des_Services_Numeriques/Salemty-TN/public/repo.png" alt="Repos" /></div>
                <h3>Repos</h3>
                <ul>
                  <li>7-8 heures de sommeil par nuit</li>
                  <li>Réduit le risque d'infection</li>
                  <li>Favorise la guérison</li>
                </ul>
              </div>

              <div class="tip-card">
                <div class="tip-icon">▲</div>
                <h3>Activité physique</h3>
                <ul>
                  <li>30 minutes par jour</li>
                  <li>Renforce l'immunité</li>
                  <li>Marche, yoga, natation</li>
                </ul>
              </div>

              <div class="tip-card">
                <div class="tip-icon">◆</div>
                <h3>Alimentation</h3>
                <ul>
                  <li>Riche en fruits et légumes</li>
                  <li>Vitamines C et D</li>
                  <li>Éviter les aliments ultra-transformés</li>
                </ul>
              </div>

              <div class="tip-card">
                <div class="tip-icon">~</div>
                <h3>Hydratation</h3>
                <ul>
                  <li>2 litres d'eau par jour</li>
                  <li>Renforce les défenses naturelles</li>
                  <li>Aide à l'élimination des toxines</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Ressources téléchargeables -->
          <section class="section">
            <h2>Ressources téléchargeables</h2>
            <div class="resources-grid">
              <div class="resource-card">
                <div class="resource-icon">□</div>
                <h3>Guide de prévention</h3>
                <p>Guide complet sur les mesures de prévention</p>
                <button class="btn btn-outline btn-sm">Télécharger PDF</button>
              </div>

              <div class="resource-card">
                <div class="resource-icon">◊</div>
                <h3>Infographie de santé</h3>
                <p>Visuels informatifs sur les symptômes</p>
                <button class="btn btn-outline btn-sm">Télécharger</button>
              </div>

              <div class="resource-card">
                <div class="resource-icon">⊙</div>
                <h3>Application mobile</h3>
                <p>Accès facile aux alertes et conseils</p>
                <button class="btn btn-outline btn-sm">App Store</button>
              </div>

              <div class="resource-card">
                <div class="resource-icon">!</div>
                <h3>Alertes SMS</h3>
                <p>Recevez les alertes santéen direct</p>
                <button class="btn btn-outline btn-sm">S'inscrire</button>
              </div>
            </div>
          </section>

          <!-- Remèdes traditionnels tunisiens -->
          <section class="section">
            <h2>Remèdes traditionnels tunisiens</h2>
            <div class="remedies-grid">
              <div class="remedy-card">
                <h3>Menthe pouliot</h3>
                <p>Infusion pour les rhumes et la toux. Boire 2-3 tasses par jour.</p>
              </div>

              <div class="remedy-card">
                <h3>Miel et citron</h3>
                <p>Combine l'antibactérien du miel avec la vitamine C du citron.</p>
              </div>

              <div class="remedy-card">
                <h3>Thé à la cannelle</h3>
                <p>Température corporelle, grippeet fièvre. Réchauffant et réconfortant.</p>
              </div>

              <div class="remedy-card">
                <h3>Ail</h3>
                <p>Propriétés antibactériennes puissantes pour renforcer l'immunité.</p>
              </div>

              <div class="remedy-card">
                <h3>Piment</h3>
                <p>Stimule la circulation et aide à éliminer les toxines.</p>
              </div>

              <div class="remedy-card">
                <h3>Gingembre</h3>
                <p>Réchauffant, anti-inflammatoire, excellent pour la gorge.</p>
              </div>
            </div>
          </section>

          <!-- Numéros d'urgence -->
          <section class="section emergency">
            <h2>Numéros d'urgence</h2>
            <div class="emergency-grid">
              <div class="emergency-item">
                <strong>SAMU</strong>
                <div class="number">15</div>
              </div>
              <div class="emergency-item">
                <strong>Police</strong>
                <div class="number">197</div>
              </div>
              <div class="emergency-item">
                <strong>Pompiers</strong>
                <div class="number">198</div>
              </div>
              <div class="emergency-item">
                <strong>Urgences médicales</strong>
                <div class="number">+216 71 862 000</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prevention-page {
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
      margin-bottom: 3rem;
      font-size: 1.1rem;
    }

    .section {
      margin-bottom: 3rem;
    }

    .section h2 {
      margin-bottom: 2rem;
      text-align: center;
    }

    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .tip-card {
      background: white;
      border-radius: 0.75rem;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border-top: 4px solid #E70013;
      transition: all 0.3s ease;
    }

    .tip-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(231, 0, 19, 0.15);
    }

    .tip-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      display: block;
    }

    .tip-card h3 {
      margin-bottom: 1rem;
      color: #E70013;
    }

    .tip-card ul {
      list-style: none;
      padding: 0;
    }

    .tip-card li {
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      position: relative;
      color: #6b7280;
      font-size: 0.95rem;
    }

    .tip-card li:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
    }

    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .resource-card {
      background: white;
      border-radius: 0.75rem;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 2px solid #e5e7eb;
      transition: all 0.3s ease;
    }

    .resource-card:hover {
      border-color: #E70013;
      box-shadow: 0 8px 16px rgba(231, 0, 19, 0.15);
    }

    .resource-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
    }

    .resource-card h3 {
      color: #E70013;
      margin-bottom: 0.5rem;
    }

    .resource-card p {
      margin-bottom: 1.5rem;
      color: #6b7280;
      font-size: 0.95rem;
    }

    .remedies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .remedy-card {
      background: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border-left: 4px solid #E70013;
    }

    .remedy-card h3 {
      margin-bottom: 0.75rem;
      color: #1f2937;
    }

    .remedy-card p {
      color: #6b7280;
      font-size: 0.95rem;
    }

    .emergency {
      background: linear-gradient(135deg, #E70013 0%, #b3000f 100%);
      color: white;
      padding: 2rem;
      border-radius: 0.75rem;
      text-align: center;
    }

    .emergency h2 {
      color: white;
    }

    .emergency-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .emergency-item {
      background-color: rgba(255, 255, 255, 0.2);
      padding: 1.5rem;
      border-radius: 0.5rem;
    }

    .emergency-item strong {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .number {
      font-size: 2rem;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .tips-grid,
      .resources-grid,
      .remedies-grid {
        grid-template-columns: 1fr;
      }

      .emergency-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class PreventionComponent { }
