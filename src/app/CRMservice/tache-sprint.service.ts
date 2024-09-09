import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrmTacheLib } from '../CRMinterface/crm-tache-lib';

@Injectable({
  providedIn: 'root'
})
export class TacheSprintService {

  private apiUrl = 'http://localhost:3000/api/erp/CrmTache/'; // Lien vers ton backend Node.js

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les tâches
  getTaches(idProject?:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+idProject);
  }
}
