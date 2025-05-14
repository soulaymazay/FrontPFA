import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Profile {
  name: string;
  email: string;
}

export interface Application {
  projectTitle: string;
  projectType: string;
  supervisorName: string;
  status: string;
  dateSubmitted: string;
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor() { }

  getProfile(): Observable<Profile> {
    // Simuler l'appel à une API
    return of({ name: 'John Doe', email: 'john@example.com' });
  }

  getApplications(): Observable<Application[]> {
    // Simuler l'appel à une API
    return of([
      { projectTitle: 'Project 1', projectType: 'Type A', supervisorName: 'Dr. Smith', status: 'Submitted', dateSubmitted: '2025-01-01' },
      { projectTitle: 'Project 2', projectType: 'Type B', supervisorName: 'Dr. Brown', status: 'In Progress', dateSubmitted: '2025-03-01' }
    ]);
  }
}
