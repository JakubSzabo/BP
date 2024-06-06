import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = environment.apiUrl;

  protected readonly baseUrl: string = `${this.apiUrl}/api/v1/articles`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    let url = this.baseUrl;
    return this.http.get<any>(url).pipe()
  }
}
