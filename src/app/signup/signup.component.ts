import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  submit() {
  if (this.signupForm.invalid) return;

  const { username, email, password, confirmPassword, role } = this.signupForm.value;

  if (password !== confirmPassword) {
    this.errorMessage = 'Les mots de passe ne correspondent pas.';
    return;
  }

  this.isLoading = true;
  const payload = { username, email, password, role };

  this.authService.postSignup(payload).subscribe({
    next: (response) => {
      console.log('Inscription réussie :', response);
      this.isLoading = false;

      // Redirection conditionnelle
      if (role === 'candidat') {
        this.router.navigate(['/completer-profil'], {
          queryParams: { email }
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
