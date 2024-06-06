import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../../shared/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly fileUrl = `${this.apiUrl}/api/v1/file`;
  protected readonly photoUrl = `${this.apiUrl}/api/v1/photos`;
  protected readonly aboutSDUrl = `${this.apiUrl}/api/v1/aboutSD`;

  protected readonly token = this.tokenService.addToken();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAboutSD(): Observable<any> {
    return this.http.get<any>(this.aboutSDUrl, { headers: this.token }).pipe();
  }

  creteAboutSD(body: any): Observable<any> {
    return this.http.post<any>(this.aboutSDUrl, body, { headers: this.token }).pipe();
  }

  updateAboutSD(id: string, update: any): Observable<any> {
    const url = `${this.aboutSDUrl}/${id}`;
    return this.http.put(url, update, { headers: this.token }).pipe();
  }

  getPhotoByCategory(category: string): Observable<any[]> {
    const url = `${this.photoUrl}/category/${category}`;
    return this.http.get<any[]>(url, { headers: this.token }).pipe();
  }

  createPhoto(body: any): Observable<any> {
    return this.http.post(this.photoUrl, body, { headers: this.token }).pipe();
  }

  deletePhoto(id: string): Observable<any> {
    const url = `${this.photoUrl}/${id}`;
    return this.http.delete(url, { headers: this.token }).pipe();
  }

  getAllFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.fileUrl, { headers: this.token }).pipe();
  }

  creteFile(body: any): Observable<any> {
    return this.http.post<any>(this.fileUrl, body, { headers: this.token }).pipe();
  }

  deleteFile(id: string): Observable<any> {
    const url = `${this.fileUrl}/${id}`;
    return this.http.delete(url, { headers: this.token }).pipe();
  }
}
