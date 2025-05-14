import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL correcte pour l'inscription
  
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${environment.prefix}/login`, { email, password });
  }

  postSignup(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/register', data);
  }
  
  }

