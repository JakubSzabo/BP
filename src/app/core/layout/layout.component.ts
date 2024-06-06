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
      label: 'Domov',
      link: '/',
    },
    {
      label: 'O internáte',
      link: '/about',
    },
    {
      label: 'Galéria',
      link: '/gallery',
    },
    {
      label: 'Príspevky',
      link: '/events',
    },
    {
      label: 'Login',
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
