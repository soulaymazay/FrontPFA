import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-sujets-proposes',
  standalone: true,
  imports: [ CommonModule, FormsModule,HttpClientModule,NavbarComponent],
  templateUrl: './sujets-proposes.component.html',
  styleUrl: './sujets-proposes.component.css'
})
export class SujetsProposesComponent implements OnInit {
  sujets: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getSujetsValides().subscribe({
      next: (data) => this.sujets = data,
      error: (err) => console.error('Erreur lors du chargement des sujets', err)
    });
  }

  showModal = false;
sujetSelectionne: any = null;

candidature: any = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  domaine: '',
  cv: null
};

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    this.candidature.cv = file;
  } else {
    alert('Veuillez sélectionner un fichier PDF.');
  }
}

postuler(sujet: any): void {
  this.sujetSelectionne = sujet;
  this.showModal = true;
}

fermerModal(): void {
  this.showModal = false;
  this.candidature = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    domaine: '',
    cv: null
  };
}

envoyerCandidature(): void {
  if (!this.candidature.cv) {
    alert('Veuillez ajouter votre CV au format PDF.');
    return;
  }

  const formData = new FormData();
  formData.append('nom', this.candidature.nom);
  formData.append('prenom', this.candidature.prenom);
  formData.append('email', this.candidature.email);
  formData.append('telephone', this.candidature.telephone);
  formData.append('domaine', this.candidature.domaine);
  formData.append('cv', this.candidature.cv);
  formData.append('sujetId', this.sujetSelectionne._id);

  // Appel vers le backend (à adapter selon ton API)
  this.authService.postCandidature(formData).subscribe(
    (res) => {
      alert('Candidature envoyée avec succès !');
      this.fermerModal();
    },
    (err) => {
      alert('Erreur lors de l\'envoi de la candidature.');
      console.error(err);
    }
  );
}
}
