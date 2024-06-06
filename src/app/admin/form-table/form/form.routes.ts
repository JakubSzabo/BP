import {FormComponent} from "./form.component";
import {Route} from "@angular/router";

export default [
  { path: '', component: FormComponent, data: {id: 'create-form' } },
] as Route[]
