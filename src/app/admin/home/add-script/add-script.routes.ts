import {Route} from "@angular/router";
import {AddScriptComponent} from "./add-script.component";

export default [
  { path: '', component: AddScriptComponent, data: { id: 'add-script' } },
] as Route[];
