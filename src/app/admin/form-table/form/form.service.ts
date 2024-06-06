import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../../../shared/services/token.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly formUrl = `${this.apiUrl}/api/v1/forms`;

  protected readonly token = this.tokenService.addToken();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAllForms(): Observable<any[]> {
    return this.http.get<any[]>(this.formUrl, { headers: this.token }).pipe();
  }

  getFormById(id: string): Observable<any> {
    const url = `${this.formUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.token }).pipe();
  }

  createForm(body: any): Observable<any> {
    return this.http.post(this.formUrl, body, { headers: this.token }).pipe();
  }

  updateForm(id: string, body: any): Observable<any> {
    const url = `${this.formUrl}/${id}`;
    return this.http.put(url, body, { headers: this.token }).pipe();
  }

  deleteForm(id: string): Observable<any> {
    const url = `${this.formUrl}/${id}`;
    return this.http.delete(url, { headers: this.token }).pipe();
  }
}
