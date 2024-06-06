import { EventsComponent } from "./events.component";
import { Route } from "@angular/router";

export default [
  { path: '', component: EventsComponent, data: { id: 'events' } },
] as Route[];
