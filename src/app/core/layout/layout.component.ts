import { Component } from '@angular/core';
import { TopNavComponent } from "../top-nav/top-nav.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    TopNavComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  links = [
    {
      label: 'home',
      link: '/',
    },
    {
      label: 'about',
      link: '/about',
    },
    {
      label: 'gallery',
      link: '/gallery',
    },
    {
      label: 'articles',
      link: '/events',
    },
    {
      label: 'login',
      link: '/login',
    },
  ];
  constructor() { }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
