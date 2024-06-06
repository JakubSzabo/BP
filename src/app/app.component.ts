import { Component } from '@angular/core';
import { HomeComponent } from "./features/home/home.component";
import { RouterOutlet } from '@angular/router';
import {TopNavComponent} from "./core/top-nav/top-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, TopNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rus-web-fe';
}
