import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  protected readonly baseUrl: string = `${this.apiUrl}/api/v1/login`;
  constructor(protected http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    let url = this.baseUrl;
    return this.http.post(url, {userName: userName, password: password}).pipe();
  }
}
