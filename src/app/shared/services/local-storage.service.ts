import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private TOKEN_KEY = 'token';
  constructor() { }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? "";
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY)
  }
}
