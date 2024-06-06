import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly photoUrl = `${this.apiUrl}/api/v1/photos`;

  constructor(private http: HttpClient) { }

  getCategories() {
    const url = this.photoUrl + "/categories"
    return this.http.get<any[]>(url).pipe();
  }

  getByCategories(category: string) {
    const url = this.photoUrl + "/category/" + category;
    return this.http.get<any[]>(url).pipe();
  }
}
