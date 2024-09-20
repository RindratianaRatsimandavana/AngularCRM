import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userole } from '../CRMinterface/userole';
import { User } from '../CRMinterface/user';

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

  getAllEmployeInfo(): Observable<any> {
    console.log("tato amin service");
    return this.http.get<User>(this.uri +"UserRole/");
  }
}
