import {Route} from "@angular/router";
import {AddNewComponent} from "./add-new.component";

export default [
  { path: '', component: AddNewComponent, data: { id: 'articles' } },
] as Route[];
