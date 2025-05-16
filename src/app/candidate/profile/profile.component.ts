import { Component, OnInit } from '@angular/core';
import { AuthService, Profil } from '../../services/auth.service'; // adapte le chemin si besoin
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = {
    fullName: '',
    phone: '',
    email: '',
    address: '',
    title: '',
    experience: '',
    skills: '',
    education: '',
    fieldOfInterest: ''
  };

  profilId: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.profilId = localStorage.getItem('userId') || ''; // récupérer l'ID stocké
    if (this.profilId) {
      this.loadProfile();
    } else {
      console.error('ID utilisateur non trouvé dans localStorage');
      // Ici tu peux rediriger ou afficher un message d'erreur si besoin
    }
  }

  loadProfile(): void {
    this.authService.getProfilById(this.profilId).subscribe({
      next: (data: Profil) => {
        this.profile = {
          fullName: `${data.prenom || ''} ${data.nom || ''}`.trim(),
          phone: data.telephone || '',
          email: data.email || '',
          address: data.adresse || '',
          title: data.niveau || '',
          experience: data.experience || '',
          skills: data.competences || '',
          education: data.formation || '',
          fieldOfInterest: data.domaine || ''  // Ici c'est domaineRecherche si c'est ton nom côté backend
        };
      },
      error: err => {
        console.error('Erreur récupération profil', err);
      }
    });
  }
}
