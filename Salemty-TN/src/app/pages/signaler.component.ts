import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signaler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="signaler-page">
      <div class="container">
        <h1>Signalez vos symptômes</h1>
        <p class="subtitle">Votre contribution est anonyme et confidentielle. Aidez-nous à protéger la Tunisie.</p>

        <div class="form-container">
          <form (ngSubmit)="submitForm()">
            <!-- Step Indicator -->
            <div class="steps">
              <div [class.step]="true" [class.active]="currentStep() === 1" [class.completed]="currentStep() > 1">
                <span>1</span>
                <span class="label">Symptômes</span>
              </div>
              <div class="step-line"></div>
              <div [class.step]="true" [class.active]="currentStep() === 2" [class.completed]="currentStep() > 2">
                <span>2</span>
                <span class="label">Durée</span>
              </div>
              <div class="step-line"></div>
              <div [class.step]="true" [class.active]="currentStep() === 3" [class.completed]="currentStep() > 3">
                <span>3</span>
                <span class="label">Localisation</span>
              </div>
            </div>

            <!-- Step 1: Symptoms -->
            <div *ngIf="currentStep() === 1" class="step-content">
              <h2>Quels symptômes ressentez-vous?</h2>
              <p>Sélectionnez tous les symptômes que vous avez.</p>
              
              <div class="checkbox-group">
                <label *ngFor="let symptom of symptoms" class="checkbox-item">
                  <input type="checkbox" [value]="symptom" (change)="toggleSymptom(symptom)">
                  <span>{{ symptom }}</span>
                </label>
              </div>

              <div class="form-group">
                <label>Autres symptômes (optionnel)</label>
                <textarea [(ngModel)]="otherSymptoms" name="otherSymptoms" placeholder="Décrivez tout autre symptôme..."></textarea>
              </div>
            </div>

            <!-- Step 2: Duration -->
            <div *ngIf="currentStep() === 2" class="step-content">
              <h2>Depuis combien de temps avez-vous ces symptômes?</h2>
              
              <div class="form-group">
                <select [(ngModel)]="symptomDuration" name="duration">
                  <option value="">-- Sélectionnez la durée --</option>
                  <option value="less-than-24">Moins de 24 heures</option>
                  <option value="1-3-days">1 à 3 jours</option>
                  <option value="4-7-days">4 à 7 jours</option>
                  <option value="1-2-weeks">1 à 2 semaines</option>
                  <option value="more-than-2-weeks">Plus de 2 semaines</option>
                </select>
              </div>

              <div class="form-group">
                <label class="checkbox-item">
                  <input type="checkbox" [(ngModel)]="hasComorbidities" name="comorbidities">
                  <span>Je souffre de problèmes de santé chroniques</span>
                </label>
              </div>
            </div>

            <!-- Step 3: Location -->
            <div *ngIf="currentStep() === 3" class="step-content">
              <h2>Où êtes-vous situé?</h2>
              
              <div class="location-options">
                <button type="button" class="location-btn" (click)="useGPS()" [class.active]="locationMethod() === 'gps'">
                  📍 Utiliser le GPS
                </button>
                <button type="button" class="location-btn" (click)="useManual()" [class.active]="locationMethod() === 'manual'">
                  🗺️ Sélectionner manuellement
                </button>
              </div>

              <div *ngIf="locationMethod() === 'manual'" class="form-group">
                <label>Gouvernorat</label>
                <select [(ngModel)]="selectedGovernorate" name="governorate">
                  <option value="">-- Sélectionnez un gouvernorat --</option>
                  <option *ngFor="let gov of governorates" [value]="gov">{{ gov }}</option>
                </select>
              </div>

              <div *ngIf="locationApproved()" class="success-message">
                ✅ Localisation confirmée: {{ selectedGovernorate }}
              </div>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button type="button" class="btn btn-outline" (click)="previousStep()" [disabled]="currentStep() === 1">
                Précédent
              </button>
              <button *ngIf="currentStep() < 3" type="button" class="btn btn-primary" (click)="nextStep()">
                Suivant
              </button>
              <button *ngIf="currentStep() === 3" type="submit" class="btn btn-primary">
                Soumettre mon signalement
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <div *ngIf="submissionSuccess()" class="success-modal">
            <div class="modal-content">
              <div class="success-icon">✅</div>
              <h2>Merci pour votre contribution!</h2>
              <p>Votre signalement a été reçu avec succès.</p>
              <p class="text-small">Votre anonymat est garanti. Les données aident à protéger tous les Tunisiens.</p>
              <button type="button" class="btn btn-primary" (click)="resetForm()">
                Faire un autre signalement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signaler-page {
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

    .form-container {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      padding: 3rem;
      border-radius: 0.75rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    /* Steps */
    .steps {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
    }

    .step span:first-child {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #e5e7eb;
      color: #6b7280;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1rem;
      transition: all 0.3s ease;
    }

    .step.active span:first-child {
      background-color: #E70013;
      color: white;
      transform: scale(1.1);
    }

    .step.completed span:first-child {
      background-color: #10b981;
      color: white;
    }

    .label {
      font-size: 0.8rem;
      text-align: center;
      color: #6b7280;
    }

    .step-line {
      flex: 1;
      height: 2px;
      background-color: #e5e7eb;
      margin: 0 1rem;
    }

    /* Form Content */
    .step-content h2 {
      margin-bottom: 1.5rem;
      color: #E70013;
    }

    .step-content p {
      margin-bottom: 1.5rem;
      color: #6b7280;
    }

    .checkbox-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .checkbox-item:hover {
      border-color: #E70013;
      background-color: rgba(231, 0, 19, 0.05);
    }

    .checkbox-item input[type="checkbox"] {
      width: auto;
      padding: 0;
      margin: 0;
      cursor: pointer;
      accent-color: #E70013;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #374151;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-family: inherit;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #E70013;
      box-shadow: 0 0 0 3px rgba(231, 0, 19, 0.1);
    }

    .location-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .location-btn {
      padding: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.5rem;
      background-color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
      font-weight: 500;
    }

    .location-btn:hover {
      border-color: #E70013;
    }

    .location-btn.active {
      border-color: #E70013;
      background-color: rgba(231, 0, 19, 0.05);
      color: #E70013;
    }

    .success-message {
      padding: 1rem;
      background-color: #d1fae5;
      border: 1px solid #6ee7b7;
      border-radius: 0.5rem;
      color: #047857;
      margin-bottom: 1.5rem;
      text-align: center;
      font-weight: 500;
    }

    /* Form Actions */
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
    }

    .form-actions .btn {
      flex: 1;
    }

    /* Success Modal */
    .success-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal-content {
      background-color: white;
      padding: 3rem;
      border-radius: 1rem;
      text-align: center;
      max-width: 400px;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        transform: translateY(50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .success-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      display: block;
    }

    .modal-content h2 {
      margin-bottom: 1rem;
    }

    .modal-content p {
      margin-bottom: 0.5rem;
    }

    .text-small {
      font-size: 0.9rem;
      margin-bottom: 1.5rem !important;
    }

    @media (max-width: 768px) {
      .form-container {
        padding: 1.5rem;
      }

      .checkbox-group {
        grid-template-columns: 1fr;
      }

      .location-options {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
      }

      .steps {
        gap: 0.5rem;
      }

      .step-line {
        margin: 0 0.5rem;
      }

      .label {
        font-size: 0.7rem;
      }
    }
  `]
})
export class SignalerComponent {
  currentStep = signal(1);
  submissionSuccess = signal(false);
  locationMethod = signal<'gps' | 'manual'>('manual');
  locationApproved = signal(false);

  symptoms = ['Toux', 'Fièvre', 'Mal de tête', 'Fatigue', 'Mal de gorge', 'Dyspnée'];
  governorates = [
    'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Gabès',
    'Gafsa', 'Kébili', 'Kasserine', 'Tataouine',
    'Béja', 'Jendouba', 'Nabeul', 'Monastir',
    'Mahdia', 'Saïda', 'Zarzis', 'Médenine',
    'Djerba', 'Douz', 'Ben Arous'
  ];

  selectedSymptoms: string[] = [];
  otherSymptoms: string = '';
  symptomDuration: string = '';
  hasComorbidities: boolean = false;
  selectedGovernorate: string = '';

  nextStep() {
    if (this.currentStep() < 3) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  toggleSymptom(symptom: string) {
    const index = this.selectedSymptoms.indexOf(symptom);
    if (index > -1) {
      this.selectedSymptoms.splice(index, 1);
    } else {
      this.selectedSymptoms.push(symptom);
    }
  }

  useGPS() {
    this.locationMethod.set('gps');
    // In a real app, this would request GPS permission
    this.selectedGovernorate = 'Tunis (GPS)';
    this.locationApproved.set(true);
  }

  useManual() {
    this.locationMethod.set('manual');
    this.locationApproved.set(false);
    this.selectedGovernorate = '';
  }

  submitForm() {
    if (this.selectedSymptoms.length > 0 && this.symptomDuration && this.selectedGovernorate) {
      this.submissionSuccess.set(true);
    }
  }

  resetForm() {
    this.currentStep.set(1);
    this.selectedSymptoms = [];
    this.otherSymptoms = '';
    this.symptomDuration = '';
    this.hasComorbidities = false;
    this.selectedGovernorate = '';
    this.locationMethod.set('manual');
    this.locationApproved.set(false);
    this.submissionSuccess.set(false);
  }
}
