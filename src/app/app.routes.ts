import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './candidate/profile/profile.component'; // Corrigé ici

import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms'; // ⬅️ AJOUT ICI
import { CandidateService } from './core/services/candidate.service';
import { CompleterProfilComponent } from './candidate/completer-profil/completer-profil.component';
import { ProposerSujetComponent } from './candidate/proposer-sujet/proposer-sujet.component';
import { SujetsProposesComponent } from './sujets-proposes/sujets-proposes.component';

// Déclare les routes en premier
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'liste', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent } ,
  { path: '', redirectTo: 'proposer-sujet', pathMatch: 'full' },
  { path: 'proposer-sujet', component: ProposerSujetComponent },
  { path: 'completer-profil', component: CompleterProfilComponent },
    { path: 'sujets-proposes', component: SujetsProposesComponent }
// Corrigé ici
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule], // Utilise ici la variable routes après sa déclaration
  exports: [RouterModule],
  providers: [CandidateService] // Ajoute le service ici si nécessaire
})
export class AppRoutingModule {}
