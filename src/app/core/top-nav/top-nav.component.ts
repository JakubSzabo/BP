import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { Link } from "../../shared/models/link";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "../../shared/services/local-storage.service";

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    RouterLink,
    SidebarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    TranslateModule,
  ],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Input() links: Link[] = []

  countries = [
    { name: 'Slovenčina', code: 'sk' },
    { name: 'English', code: 'en' },
  ];
  selectedCountry: any;

  sidebarVisible: boolean = false;

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    const storedCode = this.localStorageService.getLanguage();
    const foundCountry = this.countries.find(country => country.code === storedCode);
    if (foundCountry) {
      this.selectedCountry = foundCountry;
    } else {
      this.selectedCountry = this.countries[0];
    }
  }

  changeLanguage() {
    this.translate.use(this.selectedCountry.code);
    this.localStorageService.changeLanguage(this.selectedCountry.code);
  }
}
