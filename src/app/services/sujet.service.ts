import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SujetService {
  private apiUrl = 'http://localhost:3000/api/sujets'; // adapte l’URL

  constructor(private http: HttpClient) {}

  getEncadrants() {
    return this.http.get<any[]>(`${this.apiUrl}/encadrants`);
  }

  proposerSujet(formData: FormData) {
    return this.http.post(`${this.apiUrl}/proposer`, formData);
  }
}
