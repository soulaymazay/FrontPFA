import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../../navbar/navbar.component';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-proposer-sujet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent
  ],
  templateUrl: './proposer-sujet.component.html',
  styleUrls: ['./proposer-sujet.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('pulse', [
      state('true', style({ transform: 'scale(1)' })),
      state('false', style({ transform: 'scale(1.02)' })),
      transition('false <=> true', animate('200ms ease-in-out'))
    ])
  ]
})
export class ProposerSujetComponent implements OnInit {
  sujetForm!: FormGroup;
  encadrants: any[] = [];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.sujetForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      technologie: ['', Validators.required],
      entreprise: ['', Validators.required],
      emailEntreprise: ['', [Validators.required, Validators.email]],
      encadrantId: ['', Validators.required],
      cv: [null, Validators.required]
    });

    this.loadEncadrants();
  }

  loadEncadrants() {
    this.http.get<any[]>('http://localhost:3001/api/encadrants')
      .subscribe(data => this.encadrants = data);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.sujetForm.patchValue({ cv: file });
      this.sujetForm.get('cv')?.updateValueAndValidity();
    }
  }

  get f() {
    return this.sujetForm.controls;
  }

  onSubmit() {
    console.log('encadrantId:', this.f['encadrantId'].value);

    if (this.sujetForm.invalid) {
      this.sujetForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.f['titre'].value);
    formData.append('description', this.f['description'].value);
    formData.append('technologie', this.f['technologie'].value);
    formData.append('entreprise', this.f['entreprise'].value);
    formData.append('emailEntreprise', this.f['emailEntreprise'].value);
    formData.append('encadrantId', this.f['encadrantId'].value);

    if (this.selectedFile) {
      formData.append('cv', this.selectedFile);
    }

   this.http.post('http://localhost:3001/api/proposer', formData).subscribe({
  next: () => alert('Sujet proposé avec succès !'),
  error: (err) => {
    console.error('Erreur:', err);
    alert('Erreur lors de l\'envoi du sujet : ' + (err.error?.message || err.message || JSON.stringify(err)));
  }
});



  }
}
