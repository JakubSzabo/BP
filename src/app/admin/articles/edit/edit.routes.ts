import {Route} from "@angular/router";
import {EditComponent} from "./edit.component";

export default [
  { path: '', component: EditComponent, data: { id: 'editArticles' } },
] as Route[];
