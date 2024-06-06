import {FormTableComponent} from "./form-table.component";
import {Route} from "@angular/router";

export default [
  { path: '', component: FormTableComponent, data: { id: 'forms' } },
] as Route[];
