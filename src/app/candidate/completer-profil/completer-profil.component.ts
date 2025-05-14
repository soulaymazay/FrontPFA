import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completer-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './completer-profil.component.html',
  styleUrls: ['./completer-profil.component.css']
})
export class CompleterProfilComponent implements OnInit {
  profilForm!: FormGroup;
  email: string = '';
  avatarPreview: string | ArrayBuffer | null = '/assets/avatar.png';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });

    this.profilForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      niveau: ['', Validators.required],
      adresse: [''],
      experience: [''],
      competences: [''],
      formation: [''],
      domaineRecherche: ['']
    });

    this.loadDefaultAvatar();
  }

  loadDefaultAvatar() {
    const img = new Image();
    img.src = '/assets/avatar.png';
    img.onerror = () => {
      console.warn("L'avatar par défaut n'a pas pu être chargé");
      this.avatarPreview = '/assets/default-avatar.png';
    };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Vérification du type de fichier
      if (!file.type.match('image.*')) {
        alert('Seules les images sont acceptées');
        return;
      }

      // Vérification de la taille (max 2MB)
      if (file.size > 2097152) {
        alert('La taille maximale est de 2MB');
        return;
      }

      this.selectedFile = file;

      // Aperçu de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profilForm.valid) {
      const formData = new FormData();

      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile);
      }

      formData.append('email', this.email);
      formData.append('profileData', JSON.stringify(this.profilForm.value));

      console.log('Données du formulaire:', formData);
      // Envoi au backend...
    } else {
      this.markFormGroupTouched(this.profilForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
