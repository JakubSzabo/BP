import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TokenService} from "../../shared/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly baseUrl: string = `${this.apiUrl}/api/v1/about`;

  protected readonly token = this.tokenService.addToken();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe();
  }

  createAbout(about: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, about, { headers: this.token }).pipe();
  }

  updateAbout(id: string, about: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, about, { headers: this.token }).pipe();
  }
}
