import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private TOKEN_KEY = 'token';
  private LANGUAGE = 'i18n';
  constructor() { }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? "";
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  changeLanguage(languageCode: any) {
    localStorage.setItem(this.LANGUAGE, languageCode);
  }

  getLanguage() {
    return localStorage.getItem(this.LANGUAGE);
  }
}
