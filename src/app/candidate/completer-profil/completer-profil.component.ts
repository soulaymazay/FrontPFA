import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './completer-profil.component.html',
  styleUrls: ['./completer-profil.component.css']
})
export class CompleterProfilComponent {
  profilForm: FormGroup;
  avatarPreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.profilForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?\d{8,15}$/)]],
      niveau: ['', Validators.required],
      adresse: [''],
      experience: [''],
      competences: [''],
      formation: [''],
      domaine: [''],
      email: ['', [Validators.required, Validators.email]],
      image: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
        this.profilForm.patchValue({ image: reader.result }); // base64
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profilForm.invalid) {
      alert('❌ Veuillez remplir tous les champs obligatoires correctement.');
      this.profilForm.markAllAsTouched();
      return;
    }

    const formData = this.profilForm.value;
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert("⚠️ Utilisateur non identifié. Veuillez vous reconnecter.");
      return;
    }

    console.log("🟢 userId:", userId);
    console.log("📦 Données envoyées:", formData);

    this.http.post(`http://localhost:3001/api/completer-profil/${userId}`, formData).subscribe({
      next: res => {
        alert('✅ Profil enregistré avec succès.');
        this.router.navigate(['/profile']);
      },
      error: err => {
        console.error('🛑 Erreur complète:', err);
        if (err.status === 400 && err.error?.message) {
          alert(`Erreur : ${err.error.message}`);
        } else {
          alert('❌ Erreur lors de la sauvegarde du profil.');
        }
      }
    });
  }
}
