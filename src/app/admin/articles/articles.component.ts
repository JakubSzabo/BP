import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TableModule } from "primeng/table";
import { Article } from "../../shared/models/article";
import { ArticlesService } from "./articles.service";
import { FormsModule } from "@angular/forms";
import {AboutService} from "./about.service";

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    RouterLink,
    TableModule,
    FormsModule,
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  data: Article[] = [];


  constructor(
    private service: ArticlesService,
    private aboutService: AboutService,
    ) { }

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.service.getAll().subscribe(res => {
      this.data = res;
    });
  }

  copyArticle(article: Article) {
    this.service.create({ title: article.title, text: article.text, favorite: false }).subscribe(_ => {
      this.getAll();
    });
  }

  delete(id: string) {
    this.service.delete(id).subscribe(_ => {
      this.getAll();
    });
  }

  makeArticleFavorite(article: Article) {
    this.service.update(article.id!, { title: article.title, text: article.text, favorite: !article.favorite }).subscribe(_ => {
      this.getAll();
    });
  }
}
