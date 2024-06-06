import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {LoginService} from "./login.service";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import { Router } from '@angular/router';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    TranslateModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName: string = "";
  password: string = "";

  constructor(
    private service: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  login() {
    this.service.login(this.userName, this.password).subscribe(res => {
      this.localStorageService.saveToken(res.token);
      this.router.navigate(['/admin']);
    },
    (error: any) => {
      console.log(error)
      this.messageService.add({ severity: 'error', summary: 'Chyba', detail: 'Zle meno alebo heslo' });
    });
  }
}
