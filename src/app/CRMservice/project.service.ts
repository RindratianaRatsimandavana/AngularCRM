import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRMMembreProjet } from '../CRMinterface/crmmembre-projet';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:3000/api/erp/';


  getAllUserProject(idEmploye?:string,idTypeProjet?:string): Observable<any> {
    console.log("tato amin proejct service");
    const offUrl=this.uri +"CRMMembreProjet/"+idEmploye+"/"+idTypeProjet; 
    console.log("Urllllllllllllllllllllllllllllllllllll");
    console.log(offUrl);
    console.log("Fin Url");
    return this.http.get<CRMMembreProjet>(offUrl);
  }

  createProject(credentials: { 
      nom:  string,
      date_creation : string,
      date_echeance : string,
      id_type_projet : string,
      id_type_suivi : string,
      id_client : string,
      description : string,
      statut: number
  }): Observable<any> {
    return this.http.post<any>(this.uri + "CRMMembreProjet/saveProject/", credentials);
  }

  saveMembers(data: any[]): Observable<any> {
    return this.http.post(this.uri +'CRMMembreProjet/saveMembersProject', data);  // Envoie tous les membres en une seule requête
  }
  

}
