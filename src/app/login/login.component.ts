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

  onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;

    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      this.isLoading = false;
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Connexion réussie', res);
        this.router.navigate(['/profile']);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Email ou mot de passe incorrect.';
        this.isLoading = false;
      }
    });

  }
}
