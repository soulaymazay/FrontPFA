import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(email: string, password: string): Observable<any> {
    // Simulation d'une réponse d'API avec un délai
    if (email === 'test@example.com' && password === 'password123') {
      return of({ success: true, token: 'fake-jwt-token' });
    } else {
      return of({ success: false });
    }
  }
}
