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


  getAllUserProject(idEmploye?:string): Observable<any> {
    console.log("tato amin proejct service");
    const offUrl=this.uri +"CRMMembreProjet/"+idEmploye;
    console.log("Urllllllllllllllllllllllllllllllllllll");
    console.log(offUrl);
    console.log("Fin Url");
    return this.http.get<CRMMembreProjet>(offUrl);
  }
}
