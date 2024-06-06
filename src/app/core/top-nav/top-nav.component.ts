import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { Link } from "../../shared/models/link";

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    RouterLink,
    SidebarModule,
    ButtonModule,
  ],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss'
})
export class TopNavComponent implements OnInit {
  @Input() links: Link[] = []

  sidebarVisible: boolean = false;

  ngOnInit() {}
}
