import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Profil {
  _id: string;
  nom: string;
  prenom: string;
  telephone: string;
  niveau: string;
  adresse: string;
  experience: string;
  competences: string;
  formation: string;
  domaine: string;
  email: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private baseUrl = 'http://localhost:3001/api';  // ta base API (à adapter)

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${environment.prefix}/login`, { email, password });
  }

  postSignup(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/register', data);
  }

getProfilById(id: string): Observable<Profil> {
  return this.http.get<Profil>(`http://localhost:3001/api/profils/${id}`);
}

}
