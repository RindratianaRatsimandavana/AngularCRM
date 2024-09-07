import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { CookieService } from 'ngx-cookie-service'
import { User } from '../helpers/fake-backend'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: User | null = null

  public readonly authSessionKey = '_RIZZ_AUTH_SESSION_KEY_'
  private cookieService = inject(CookieService)

  uri = 'http://localhost:3000/api/erp/user/';

  constructor(private http: HttpClient) {}


  authentification(credentials: { email: string | null | undefined; password: string | null | undefined}): Observable<any> {
    return this.http.post<any>(this.uri + 'auth', credentials);
  }

  logOutProf(): Observable<any> {
    return this.http.get<any>(this.uri + 'logoutProf');
  }

  login(email: string, password: string) {
    return this.http.post<User>(`/api/login`, { email, password }).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          this.user = user
          // store user details and jwt in session
          this.saveSession(user.token)
        }
        return user
      })
    )
  }

  logout(): void {
    // remove user from cookie to log user out
    this.removeSession()
    this.user = null
  }

  get session(): string {
    return this.cookieService.get(this.authSessionKey)
  }

  saveSession(token: string): void {
    this.cookieService.set(this.authSessionKey, token)
  }

  removeSession(): void {
    this.cookieService.delete(this.authSessionKey)
  }
}
