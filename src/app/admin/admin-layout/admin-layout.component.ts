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
      label: 'minutes',
      link: '/admin',
    },
    {
      label: 'articles',
      link: '/admin/articles',
    },
    {
      label: 'photos',
      link: '/admin/photos',
    },
    {
      label: 'about',
      link: '/admin/about'
    },
    {
      label: 'forms',
      link: '/admin/forms'
    },
    {
      label: 'settings',
      link: '/admin/settings',
    },
    {
      label: 'contacts',
      link: '/admin/contacts',
    },
  ];
}
