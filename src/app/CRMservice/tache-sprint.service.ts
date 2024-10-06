import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrmTacheLib } from '../CRMinterface/crm-tache-lib';
import { CrmCommentaireTacheLib } from '../CRMinterface/crm-commentaire-tache-lib';

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

  moveTask(taskId?: string,statut?: number,id_employe_assigne?:string,idProject?:string,permission?:string): Observable<any> {
    const url = this.apiUrl+`updateStatut/`+idProject+"/"+id_employe_assigne+"/"+permission; 
    return this.http.put<any>(url,{id:taskId, statut: statut });
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
    console.log("url backlog",this.apiUrl+"backlog/"+idProject)
    return this.http.get<any>(this.apiUrl+"backlog/"+idProject);
  }

  getSprintByProject(idProject?:string): Observable<any> {
    console.log("url sprinttttttttttttttt",this.apiUrl+"sprint/"+idProject)
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

  

  updateattributeTask(credentials: {     
    id?: string,
    priorite?: number,
    id_employe_assigne?: string,
    id_sprint?: string
  }) {
    //const url = `api/sous-task/${taskId}/status`; // Exemple d'URL pour l'API/
    const url = this.apiUrl+`attributeTask`; 
    return this.http.put(url, credentials);
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
  getTachesJur(idProject?:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+"taskJur/"+idProject+"/");
  }

  getCommentaireTache(idTache?:string): Observable<any> {
    return this.http.get<CrmCommentaireTacheLib>(this.apiUrl +"commentaire/"+idTache);
  }

  getTachesCleint(idProject?:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+'client'+"/"+idProject);
  }

  //   +-----------------+--------------+------+-----+---------------------+-------+
// | Field           | Type         | Null | Key | Default             | Extra |
// +-----------------+--------------+------+-----+---------------------+-------+
// | id              | varchar(20)  | NO   | PRI | NULL                |       |
// | expediteur_id   | varchar(20)  | YES  | MUL | NULL                |       |
// | destinataire_id | varchar(20)  | YES  | MUL | NULL                |       |
// | idTache         | varchar(20)  | YES  | MUL | NULL                |       |
// | contenu         | varchar(255) | YES  |     | NULL                |       |
// | date_envoi      | date         | YES  |     | current_timestamp() |       |
// | statut          | int(11)      | YES  |     | 0                   |       |
// | etat            | int(11)      | NO   |     | 1                   |       |
// +-----------------+--------------+------+-----+---------------------+-------+
  saveCommentsTask(credentials: { 
    expediteur_id: string,
    destinataire_id: string,
    idTache: string,
    contenu: string
    }): Observable<any> {
      return this.http.post<any>(this.apiUrl+'commentaire'+"/", credentials);
  }

  
}
