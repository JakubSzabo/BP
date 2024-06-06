import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = environment.apiUrl;

  protected readonly baseUrl: string = `${this.apiUrl}/api/v1/articles`;
  protected readonly baseUrlAbout: string = `${this.apiUrl}/api/v1/about`;
  constructor(protected http: HttpClient) { }

  getAll(): Observable<any> {
    let url = this.baseUrl + "/favorites";
    return this.http.get<any>(url).pipe()
  }

  getAllAboutRus(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlAbout).pipe();
  }
}
