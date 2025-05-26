// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Profil {
  _id: string;
  userId: string;
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
private readonly apiUrl = `${environment.apiUrl}/${environment.prefix}`;


  constructor(private http: HttpClient) {}


login(email: string, password: string): Observable<{user: {_id: string}, token?: string}> {
  return this.http.post<{user: {_id: string}, token?: string}>(
    `${this.apiUrl}/login`, // Assure-toi que c’est /login ici !
    { email, password }
  );
}


// Utilise l'environnement configuré avec 'http://localhost:3001/api'


getProfilById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/profils/usersId/${id}`);
}



  // auth.service.ts
postSignup(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, data);
}
 postProfil(data: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/completer-profil', data);
  }
   getSujetsValides(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/api/projets/encadrant/valides');
  }
  postCandidature(formData: FormData): Observable<any> {
  return this.http.post('http://localhost:3001/api/postuler', formData);
}

}
