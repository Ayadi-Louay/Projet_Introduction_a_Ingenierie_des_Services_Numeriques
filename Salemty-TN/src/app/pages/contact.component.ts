import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-page">
      <div class="container">
        <h1>Nous contacter</h1>
        <p class="subtitle">Vos questions, suggestions et retours nous intéressent</p>

        <div class="contact-content">
          <!-- Contact Form -->
          <section class="contact-form-section">
            <h2>Formulaire de contact</h2>
            <form (ngSubmit)="submitContact()" #contactForm="ngForm">
              <div class="form-group">
                <label for="name">Nom complet</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  [(ngModel)]="formData.name"
                  placeholder="Votre nom"
                  required>
              </div>

              <div class="form-group">
                <label for="email">Email (optionnel)</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  [(ngModel)]="formData.email"
                  placeholder="votre@email.com">
              </div>

              <div class="form-group">
                <label for="phone">Téléphone (optionnel)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  [(ngModel)]="formData.phone"
                  placeholder="+216 XX XXX XXX">
              </div>

              <div class="form-group">
                <label for="subject">Sujet</label>
                <select id="subject" name="subject" [(ngModel)]="formData.subject" required>
                  <option value="">-- Sélectionnez un sujet --</option>
                  <option value="question">Question générale</option>
                  <option value="bug">Signaler un problème</option>
                  <option value="feature">Suggestion de fonctionnalité</option>
                  <option value="partnership">Partenariat</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  [(ngModel)]="formData.message"
                  placeholder="Écrivez votre message ici..."
                  required
                  minlength="10"></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" [disabled]="!contactForm.valid">
                Envoyer le message
              </button>
            </form>

            <div *ngIf="contactSuccess()" class="success-alert">
              ✓ Votre message a été envoyé avec succès! Nous vous répondrons dans les 24 heures.
            </div>
          </section>

          <!-- Contact Information -->
          <section class="contact-info-section">
            <h2>Informations de contact</h2>
            
            <div class="info-card">
              <div class="info-icon">■</div>
              <h3>Adresse</h3>
              <p>Ministère de la Santé<br>Tunis, Tunisie</p>
            </div>

            <div class="info-card">
              <div class="info-icon">◇</div>
              <h3>Téléphone</h3>
              <p>+216 71 000 000<br>+216 71 111 111</p>
            </div>

            <div class="info-card">
              <div class="info-icon">▲</div>
              <h3>Email</h3>
              <p><a href="mailto:info@salemty.tn">info@salemty.tn</a><br><a href="mailto:contact@salemty.tn">contact@salemty.tn</a></p>
            </div>

            <div class="info-card">
              <div class="info-icon">◆</div>
              <h3>Horaires</h3>
              <p>Lundi - Vendredi: 8h - 17h<br>Samedi - Dimanche: Fermé</p>
            </div>

            <div class="social-links">
              <h4>Suivez-nous</h4>
              <div class="links">
                <a href="#" target="_blank" class="social-link">
                  <span>Facebook</span>
                </a>
                <a href="#" target="_blank" class="social-link">
                  <span>Twitter</span>
                </a>
                <a href="#" target="_blank" class="social-link">
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </section>
        </div>

        <!-- FAQ Section -->
        <section class="faq-section">
          <h2>Questions fréquemment posées</h2>
          <div class="faq-list">
            <div class="faq-item">
              <button (click)="toggleFaq(0)" class="faq-question">
                <span>Comment fonctionneYamazonSalemty TN?</span>
                <span class="toggle">{{ expandedFaq.includes(0) ? '−' : '+' }}</span>
              </button>
              <div *ngIf="expandedFaq.includes(0)" class="faq-answer">
                <p>Salemty TN permet de signaler anonymement vos symptômes de santé. Ces données agrégées aident à surveiller la santé publique en Tunisie et à détecter les épidémies rapidement.</p>
              </div>
            </div>

            <div class="faq-item">
              <button (click)="toggleFaq(1)" class="faq-question">
                <span>Mes données personnelles sont-elles protégées?</span>
                <span class="toggle">{{ expandedFaq.includes(1) ? '−' : '+' }}</span>
              </button>
              <div *ngIf="expandedFaq.includes(1)" class="faq-answer">
                <p>Oui, 100% de vos données sont anonymes. Nous ne collectons jamais de nom, prénom, ou adresse. Seuls les symptômes et la région sont enregistrés.</p>
              </div>
            </div>

            <div class="faq-item">
              <button (click)="toggleFaq(2)" class="faq-question">
                <span>Comment puis-je arrêter les alertes?</span>
                <span class="toggle">{{ expandedFaq.includes(2) ? '−' : '+' }}</span>
              </button>
              <div *ngIf="expandedFaq.includes(2)" class="faq-answer">
                <p>Vous pouvez gérer vos préférences d'alertes dans votre profil, ou nous contacter directement pour être retiré de la liste de diffusion.</p>
              </div>
            </div>

            <div class="faq-item">
              <button (click)="toggleFaq(3)" class="faq-question">
                <span>Qui peut utiliser Salemty TN?</span>
                <span class="toggle">{{ expandedFaq.includes(3) ? '−' : '+' }}</span>
              </button>
              <div *ngIf="expandedFaq.includes(3)" class="faq-answer">
                <p>Tous les habitants de Tunisie peuvent signaler leurs symptômes. Aucune inscription requise, c'est gratuit et anonyme.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
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

    .contact-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .contact-form-section {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .contact-info-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .contact-form-section h2,
    .contact-info-section h2 {
      margin-bottom: 1.5rem;
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

    .form-group textarea {
      resize: vertical;
      min-height: 150px;
    }

    .success-alert {
      margin-top: 1.5rem;
      padding: 1rem;
      background-color: #d1fae5;
      border: 1px solid #6ee7b7;
      border-radius: 0.5rem;
      color: #047857;
      font-weight: 500;
      text-align: center;
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .info-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border-left: 4px solid #E70013;
    }

    .info-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      display: block;
    }

    .info-card h3 {
      margin: 0 0 0.5rem 0;
      color: #E70013;
    }

    .info-card p {
      margin: 0;
      color: #6b7280;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .info-card a {
      color: #E70013;
      text-decoration: none;
      font-weight: 500;
    }

    .info-card a:hover {
      text-decoration: underline;
    }

    .social-links {
      background: white;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .social-links h4 {
      margin: 0 0 1rem 0;
      color: #E70013;
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .social-link {
      display: block;
      padding: 0.75rem;
      background: linear-gradient(135deg, rgba(231, 0, 19, 0.05), rgba(179, 0, 15, 0.05));
      border-radius: 0.5rem;
      color: #E70013;
      text-decoration: none;
      text-align: center;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: linear-gradient(135deg, #E70013, #b3000f);
      color: white;
    }

    .faq-section {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .faq-section h2 {
      margin-bottom: 2rem;
      text-align: center;
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .faq-item {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .faq-question {
      width: 100%;
      padding: 1rem;
      background: white;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1rem;
      font-weight: 600;
      color: #1f2937;
      transition: all 0.3s ease;
      text-align: left;
    }

    .faq-question:hover {
      background-color: rgba(231, 0, 19, 0.05);
      color: #E70013;
    }

    .toggle {
      font-size: 1.5rem;
      color: #E70013;
      flex-shrink: 0;
    }

    .faq-answer {
      padding: 0 1rem 1rem;
      background-color: #f9fafb;
      animation: slideDown 0.3s ease;
    }

    .faq-answer p {
      margin: 0;
      color: #6b7280;
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
      }

      .form-group textarea {
        min-height: 120px;
      }
    }
  `]
})
export class ContactComponent {
  contactSuccess = signal(false);
  expandedFaq: number[] = [];

  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  submitContact() {
    if (this.formData.name && this.formData.subject && this.formData.message) {
      this.contactSuccess.set(true);
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
    this.contactSuccess.set(false);
  }

  toggleFaq(index: number) {
    const position = this.expandedFaq.indexOf(index);
    if (position > -1) {
      this.expandedFaq.splice(position, 1);
    } else {
      this.expandedFaq.push(index);
    }
  }
}
