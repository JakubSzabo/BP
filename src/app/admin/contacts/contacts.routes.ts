import {ContactsComponent} from "./contacts.component";
import {Route} from "@angular/router";

export default [
  { path: '', component: ContactsComponent, data: { id: 'admin-contacts' } }
] as Route[];
