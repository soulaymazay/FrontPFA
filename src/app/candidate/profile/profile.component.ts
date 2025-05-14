import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo = {
    name: 'Ahmed Ben Salah',
    email: 'ahmed.bensalah@example.com',
    phone: '+21612345678',
    birthDate: '1998-06-20',
    photoUrl: 'assets/default-profile.jpeg',
    status: 'Disponible',
    title: 'Développeur Full Stack',
    currentCompany: ''
  };

  profileCompletion = {
    percentage: 75,
    missingItems: [
      'Expérience professionnelle',
      'Compétences techniques',
      'Formation académique'
    ]
  };

  sections = [
    { title: 'Candidatures', icon: '📄', count: 5 },
    { title: 'Opportunités', icon: '🔍', count: 3 },
    { title: 'Mon espace', icon: '👤' }
  ];

  emailConfirmed = false;
  showStatusInfo = false;

  ngOnInit(): void {
    // Simulation de chargement des données
    setTimeout(() => {
      this.emailConfirmed = true;
    }, 1500);
  }

  toggleStatusInfo() {
    this.showStatusInfo = !this.showStatusInfo;
  }

  updateStatus(newStatus: string) {
    this.userInfo.status = newStatus;
  }
}
