import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly aboutUrl = `${this.apiUrl}/api/v1/aboutSD`;
  protected readonly photoUrl = `${this.apiUrl}/api/v1/photos`;
  protected readonly fileUrl = `${this.apiUrl}/api/v1/file`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.aboutUrl).pipe();
  }

  getByCategory() {
    const url = this.photoUrl + "/category/aboutSD";
    return this.http.get<any[]>(url).pipe();
  }

  getAllFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.fileUrl).pipe();

  }
}
