import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { FormsModule } from '@angular/forms'; // 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stages: any[] = [];
  selectedProjet: string = 'Tous';
  showUpdateForm: boolean = false;
  form!: FormGroup;
  submitted: boolean = false;

  

  constructor(private fb: FormBuilder, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadStages();
    this.form = this.fb.group({
      departmentName: ['', Validators.required]
    });
  }

  loadStages(): void {
    this.projectService.getStages().subscribe({
      next: (data) => {
        console.log(data);
        this.stages = data;
      },
      
      error: (err) => console.error('Erreur lors du chargement des projets', err)
    });
    
  }
  getStages() {
    if (this.selectedProjet === 'Tous') {
      return this.stages;
    }
    return this.stages.filter(p => p.type === this.selectedProjet);
  }
  
}
