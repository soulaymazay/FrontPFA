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
// Version améliorée de profile.component.ts
export class ProfileComponent implements OnInit {
  profile: any = {};
  isLoading = true;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile(): void {
  const userId = localStorage.getItem('userId');
  console.log('userId from storage:', userId); // 👈 Ajoute cette ligne

  if (!userId) {
    this.errorMessage = 'Utilisateur non identifié';
    this.isLoading = false;
    return;
  }

  this.authService.getProfilById(userId).subscribe({
    next: (data) => {
      console.log('Profil reçu depuis le backend :', data); // 👈 utile aussi
      this.profile = data;
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = 'Erreur de chargement du profil';
      this.isLoading = false;
      console.error(err);
    }
  });
}
}
