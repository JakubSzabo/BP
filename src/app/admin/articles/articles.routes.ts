import {Route} from "@angular/router";
import {ArticlesComponent} from "./articles.component";

export default [
  { path: '', component: ArticlesComponent, data: { id: 'articles' } },
] as Route[];
