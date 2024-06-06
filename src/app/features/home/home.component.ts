import {Component, OnInit} from '@angular/core';
import { InfoTableComponent } from "../../shared/components/info-table/info-table.component";
import {HomeService} from "./home.service";
import {Article, ArticleTab} from "../../shared/models/article";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InfoTableComponent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  articles: ArticleTab[] = [];
  firstText: string = "";
  secondText: string = "";
  firstImg: string = "";
  secondImg: string = "";

  expandedArticleId: string | null = null;

  constructor(private service: HomeService) {}

  ngOnInit() {
    this.getAllArticles();
    this.getAllAboutRus();
  }

  private getAllArticles() {
    this.service.getAll().subscribe((res) => {
      this.articles = res.map((article: Article) => ({
        ...article,
        open: false
      }));
    });
  }

  private getAllAboutRus() {
    this.service.getAllAboutRus().subscribe(res => {
      this.firstText = res[0].firstText;
      this.secondText = res[0].secondText;
      this.firstImg = res[0].firstPhotos;
      this.secondImg = res[0].secondPhotos;
    })
  }
}
