import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../../shared/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly contactsUrl = `${this.apiUrl}/api/v1/contacts`;

  protected readonly token = this.tokenService.addToken();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.contactsUrl, { headers: this.token }).pipe();
  }

  createContact(body: any): Observable<any> {
    return this.http.post<any>(this.contactsUrl, body, { headers: this.token }).pipe();
  }

  deleteContact(id: string): Observable<any> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<any>(url, { headers: this.token }).pipe();
  }
}
