import {Route} from "@angular/router";
import {EditScriptComponent} from "./edit-script.component";

export default [
  { path: '', component: EditScriptComponent, data: { id: 'edit-script' } },
] as Route[];
