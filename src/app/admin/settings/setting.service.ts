import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Member} from "../../shared/models/member";
import {TokenService} from "../../shared/services/token.service";

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  protected readonly apiUrl = environment.apiUrl;
  protected readonly baseUrl: string = `${this.apiUrl}/api/v1/member`;

  protected readonly token = this.tokenService.addToken();

  constructor(
    protected http: HttpClient,
    private tokenService: TokenService
    ) { }

  getAllMembers(): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: this.token }).pipe();
  }

  getMember(id: string): Observable<any> {
    let url = this.baseUrl + "/" + id;
    return this.http.get<any>(url, { headers: this.token }).pipe();
  }

  createMember(body: Member): Observable<any> {
    return this.http.post<any>(this.baseUrl, body, { headers: this.token }).pipe();
  }

  updateMember(id: string, body: Member): Observable<any> {
    let url = this.baseUrl + "/" + id;
    return this.http.put<any>(url, body, { headers: this.token }).pipe();
  }

  deleteMember(id: string): Observable<any> {
    let url = this.baseUrl + "/" + id;
    return this.http.delete<any>(url, { headers: this.token }).pipe()
  }
}
