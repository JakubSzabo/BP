import { Route } from "@angular/router";
import {HomeComponent} from "./home.component";

export default [
  { path: '', component: HomeComponent, data: { id: 'admin-home' } },
] as Route[];
