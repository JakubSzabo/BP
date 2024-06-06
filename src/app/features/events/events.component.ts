import {Component, OnInit} from '@angular/core';
import {InfoTableComponent} from "../../shared/components/info-table/info-table.component";
import {EventsService} from "./events.service";
import {Article, ArticleTab} from "../../shared/models/article";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    InfoTableComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  articles: ArticleTab[] = []

  constructor(private service: EventsService) {}

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.service.getAll().subscribe(res => {
      this.articles = res.map((article: Article) => ({
        ...article,
        open: false
      }));
    })
  }
}
