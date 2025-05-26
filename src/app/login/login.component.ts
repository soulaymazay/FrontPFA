import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

 // login.component.ts
onSubmit() {
  this.errorMessage = '';
  this.isLoading = true;

this.authService.login(this.email, this.password).subscribe({
  next: (res) => {
    if (!res.user?._id) {
      throw new Error('Réponse serveur invalide');
    }
    localStorage.setItem('userId', res.user._id);
    if (res.token) {
      localStorage.setItem('token', res.token);
    }

    // Affiche l'id reçu avant d'appeler getProfilById
    console.log('userId reçu:', res.user._id);
this.authService.getProfilById(res.user._id).subscribe({
  next: (profile) => {
    console.log('Profil reçu:', profile);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.isLoading = false;
    this.router.navigate(['/profile']);
  },
  error: (err) => {
    console.error('Erreur chargement profil:', err);
    this.errorMessage = 'Profil introuvable';
    this.isLoading = false;
  }
});


  },
  error: (err) => {
    console.error('Erreur login:', err);
    this.errorMessage = err.error?.message || 'Erreur de connexion';
    this.isLoading = false;
  }
});
}
}
