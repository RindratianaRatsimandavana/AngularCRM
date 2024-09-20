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
  getTaches(idProject?:string,id_employe_assigne?:string,permission?:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+idProject+"/"+id_employe_assigne+"/"+permission);
  }

  getssTachesByIdTache(idTache?:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+"sstache/"+idTache);
  }

  getTacheByIdTache(idTache?:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+"tache/"+idTache);
  }

  saveSsTask(credentials: { 
    nom?: string,
    statut?: number,
    id_employe_assigne?: string,
    id_projet?: string,
    id_sprint?: string,
    id_tache_parent?: string
}): Observable<any> {
  return this.http.post<any>(this.apiUrl, credentials);
}


  getTacheBacklogByProject(idProject?:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+"backlog/"+idProject);
  }

  getSprintByProject(idProject?:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+"sprint/"+idProject);
  }

  // updateSousTaskStatus(taskId?: string, newStatus?: number) {
  //   //const url = `api/sous-task/${taskId}/status`; // Exemple d'URL pour l'API/
  //   const url = `sstache/${taskId}`; 
  //   return this.http.put(url, { statut: newStatus });
  // }

  updateSousTaskStatus(taskId?: string, newStatus?: number) {
    //const url = `api/sous-task/${taskId}/status`; // Exemple d'URL pour l'API/
    const url = this.apiUrl+`sstache`; 
    return this.http.put(url, {id:taskId, statut: newStatus });
  }

//   updateSousTaskStatus(credentials: { 
//     nom?: string,
//     statut?: number,
//     id_employe_assigne?: string,
//     id_projet?: string,
//     id_sprint?: string,
//     id_tache_parent?: string
// }): Observable<any> {
//   return this.http.post<any>(this.apiUrl, credentials);
// }
}
