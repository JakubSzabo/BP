import { Route } from "@angular/router";
import { LoginComponent } from "./login.component";

export default [
  { path: '', component: LoginComponent, data: { id: 'login' } },
] as Route[];
