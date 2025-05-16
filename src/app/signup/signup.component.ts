import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (
      !this.user.nom ||
      !this.user.email ||
      !this.user.password ||
      !this.user.confirmPassword ||
      !this.user.role
    ) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isLoading = true;

    const payload = {
     nom: this.user.nom,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role
    };

    this.authService.postSignup(payload).subscribe({
      next: (response) => {
        console.log('Inscription réussie :', response);
        this.isLoading = false;

        if (this.user.role === 'candidat') {
          this.router.navigate(['/completer-profil'], {
            queryParams: { email: this.user.email }
          });
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Erreur complète :', err);
        this.errorMessage = err.error?.message || 'Erreur lors de l’inscription.';
        this.isLoading = false;
      }
    });
  }
}
