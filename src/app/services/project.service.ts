import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/${environment.prefix}/projets/encadrant/valides`;

  constructor(private http: HttpClient) {}

  getStages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
