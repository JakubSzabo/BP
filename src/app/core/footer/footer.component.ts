import {Component, input, OnInit} from '@angular/core';
import {FooterService} from "./footer.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  public mainContacts: {id: string, name: string, logo: string, link: string, category: string}[] = []
  public otherContacts: {id: string, name: string, logo: string, link: string, category: string}[] = []
  public sponsors: {id: string, name: string, logo: string, link: string, category: string}[] = []

  constructor(private service: FooterService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.service.getAll().subscribe(res => {
      this.parseData(res);
    })
  }

  private parseData(data: any[]) {
    data.forEach(logo => {
      if (logo.category === "sponsors") {
        this.sponsors.push(logo);
      } else if (logo.category === "contacts") {
        this.mainContacts.push(logo);
      } else if (logo.category === "other") {
        this.otherContacts.push(logo);
      }
    });
  }
}
