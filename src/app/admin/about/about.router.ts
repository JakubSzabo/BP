import {AboutComponent} from "./about.component";
import {Route} from "@angular/router";

export default  [
  { path: '', component: AboutComponent, data: {id: 'about-admin' } },
] as Route[];
