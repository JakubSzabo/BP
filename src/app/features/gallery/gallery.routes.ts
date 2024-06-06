import { GalleryComponent } from "./gallery.component";
import { Route } from "@angular/router";

export default [
  { path: '', component: GalleryComponent, data: { id: 'gallery' } },
] as Route[];
