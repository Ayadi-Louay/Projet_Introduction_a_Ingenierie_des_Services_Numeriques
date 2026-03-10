import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { SignalerComponent } from './pages/signaler.component';
import { CarteComponent } from './pages/carte.component';
import { PrevisionComponent } from './pages/previsions.component';
import { PreventionComponent } from './pages/prevention.component';
import { ProfilComponent } from './pages/profil.component';
import { ContactComponent } from './pages/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signaler', component: SignalerComponent },
  { path: 'carte', component: CarteComponent },
  { path: 'previsions', component: PrevisionComponent },
  { path: 'prevention', component: PreventionComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
