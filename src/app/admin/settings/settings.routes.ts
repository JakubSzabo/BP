import {Route} from "@angular/router";
import {SettingsComponent} from "./settings.component";

export default [
  { path: '', component: SettingsComponent, data: { id: 'admin-settings' } },
] as Route[];
