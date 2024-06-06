import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../../shared/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly photoUrl = `${this.apiUrl}/api/v1/photos`;

  protected readonly token = this.tokenService.addToken();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.photoUrl, { headers: this.token }).pipe();
  }

  createPhoto(body: any): Observable<any> {
    return this.http.post(this.photoUrl, body, { headers: this.token }).pipe();
  }

  deletePhoto(id: string): Observable<any> {
    const url = `${this.photoUrl}/${id}`;
    return this.http.delete(url, { headers: this.token }).pipe();
  }
}
