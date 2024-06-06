import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private localStorageService: LocalStorageService) { }

  addToken(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `${this.localStorageService.getToken()}`);
  }
}
