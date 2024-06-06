import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {TokenService} from "../services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  private apiUrl = environment.apiUrl;
  protected readonly baseUrl: string = `${this.apiUrl}/api/v1/login/try`;

  protected readonly token = this.tokenService.addToken();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
    ) { }

  canActivate(): Observable<boolean> | boolean {
    if (!this.token) {
      this.router.navigate(['/login']);
      return false;
    }


    return this.http.get(this.baseUrl, { headers: this.token }).pipe(
      map((res: any) => {
        return true;
      }),
      catchError((error: any) => {
        console.error(error);
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
