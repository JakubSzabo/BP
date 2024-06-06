import { Component } from '@angular/core';
import {FooterComponent} from "../../core/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {TopNavComponent} from "../../core/top-nav/top-nav.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
    imports: [
        FooterComponent,
        RouterOutlet,
        TopNavComponent
    ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  links = [
    {
      label: 'Zapisnice',
      link: '/admin',
    },
    {
      label: 'Články',
      link: '/admin/articles',
    },
    {
      label: 'Fotky',
      link: '/admin/photos',
    },
    {
      label: 'O internate',
      link: '/admin/about'
    },
    {
      label: 'Formuláre',
      link: '/admin/forms'
    },
    {
      label: 'Nastavenia',
      link: '/admin/settings',
    },
    {
      label: 'Kontakty',
      link: '/admin/contacts',
    },
  ];
}
