import { Component } from '@angular/core';
import { HomeComponent } from "./features/home/home.component";
import { RouterOutlet } from '@angular/router';
import {TopNavComponent} from "./core/top-nav/top-nav.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    TopNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('sk');
  }
}
