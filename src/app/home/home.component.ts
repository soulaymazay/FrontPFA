import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [] // Pas besoin ici de ProjectService si providedIn: 'root'
})
export class HomeComponent implements OnInit {
  stages: any[] = [];
  selectedProjet = 'Tous';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      departmentName: ['', Validators.required]
    });
    this.loadStages();
  }

  loadStages() {
    this.projectService.getStages().subscribe({
      next: (data) => this.stages = data,
      error: (err) => console.error(err)
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  getStages() {
    if (this.selectedProjet === 'Tous') return this.stages;
    return this.stages.filter(s => s.type === this.selectedProjet);
  }
}
