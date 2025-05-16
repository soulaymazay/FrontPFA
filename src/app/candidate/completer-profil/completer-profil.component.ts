import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ IMPORT CORRECT
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
    private router: Router // ✅ injection correcte
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
      domaineRecherche: [''],
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
        this.profilForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profilForm.valid) {
      const formData = this.profilForm.value;
      this.http.post('http://localhost:3001/api/completer-profil', formData).subscribe({
        next: res => {
          alert('Profil enregistré avec succès');
          console.log('Réponse serveur:', res);

          // ✅ Redirection vers la page de profil
          this.router.navigate(['/profile']);
        },
        error: err => {
          console.error('Erreur lors de la sauvegarde du profil', err);
          alert('Erreur lors de la sauvegarde du profil.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires correctement.');
      this.profilForm.markAllAsTouched();
    }
  }
}
