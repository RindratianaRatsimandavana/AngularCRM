import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userole } from '../CRMinterface/userole';
import { User } from '../CRMinterface/user';
import { CrmNotification } from '../CRMinterface/crm-notification';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:3000/api/erp/';


  getAllUserRole(): Observable<any> {
    console.log("tato amin service");
    return this.http.get<Userole>(this.uri +"UserRole/");
  }

  getAllMembreProject(idProjet?:string): Observable<any> {
    console.log("Le url pour getAllMembreProject");
    console.log(this.uri +"user/listEmpDev/info/"+idProjet)
    return this.http.get<User>(this.uri +"user/listEmpDev/info/"+idProjet);
  }

  getEmpCompetence(idEmploye?:string): Observable<any> {
    return this.http.get<Userole>(this.uri +"CRMStartData/"+idEmploye);
  }

  getNotification(idEmploye?:string): Observable<any> {
    return this.http.get<CrmNotification>(this.uri +"CrmTache/newNotif/"+idEmploye);
  }

//   ----------------+--------------+------+-----+---------------------+-------+
// | Field          | Type         | Null | Key | Default             | Extra |
// +----------------+--------------+------+-----+---------------------+-------+
// | id             | varchar(20)  | NO   | PRI | NULL                |       |
// | id_utilisateur | varchar(20)  | YES  | MUL | NULL                |       |
// | ref            | varchar(20)  | YES  |     | NULL                |       |
// | msgN           | varchar(100) | YES  |     | NULL                |       |
// | urlN           | varchar(20)  | YES  |     | NULL                |       |
// | date_envoi     | timestamp    | NO   |     | current_timestamp() |       |
// | etat           | int(11)      | YES  |     | NULL                |       |
// | statut         | int(11)      | YES  |     | 0                   |       |
// +----------------+--------------+------+-----+---------------------+-------+

  envoiNotif(credentials: { 
    id_utilisateur?: string,
    ref?: number,
    id_employe_assigne?: string,
    msgN?: string,
    urlN?: string
  }): Observable<any> {
    return this.http.post<any>(this.uri+"envoiNotif/", credentials);
  }
}
