import { Route } from "@angular/router";
import { AboutComponent } from "./about.component";

export default [
  { path: '', component: AboutComponent, data: { id: 'about' } },
] as Route[];
