import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // ❌ NE DOIT PAS être dans un service


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/projets/encadrant/681262561a8368b2968b7e04/valides`;

  constructor(private http: HttpClient) {}

  getStages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
