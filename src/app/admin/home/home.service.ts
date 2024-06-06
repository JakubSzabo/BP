import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../../shared/models/article";
import {Script} from "../../shared/models/script";
import {TokenService} from "../../shared/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly baseUrl: string = `${this.apiUrl}/api/v1/scripts`;
  protected readonly baseMemberUrl: string = `${this.apiUrl}/api/v1/member`;

  protected readonly token = this.tokenService.addToken();

  constructor(
    protected http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: this.token }).pipe();
  }

  getAllMembers(): Observable<any> {
    return this.http.get<any>(this.baseMemberUrl, { headers: this.token }).pipe();
  }

  get(id: string): Observable<any> {
    let url = this.baseUrl + "/" + id;
    return this.http.get<any>(url, { headers: this.token }).pipe();
  }

  create(body: Script): Observable<any> {
    return this.http.post<any>(this.baseUrl, body, { headers: this.token }).pipe();
  }

  update(id: string, body: Script): Observable<any> {
    let url = this.baseUrl + "/" + id;
    return this.http.put<any>(url, body, { headers: this.token }).pipe();
  }

  copy(id: string, body: Script): Observable<any> {
    let url = this.baseUrl + "/copy/" + id;
    return this.http.put<any>(url, body, { headers: this.token }).pipe();
  }

  delete(id: string): Observable<any> {
    let url = this.baseUrl + "/" + id;
    return this.http.delete<any>(url, { headers: this.token }).pipe();
  }
}
