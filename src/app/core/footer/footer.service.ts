import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private apiUrl = environment.apiUrl;

  protected readonly baseUrl: string = `${this.apiUrl}/api/v1/contacts`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe();
  }
}
