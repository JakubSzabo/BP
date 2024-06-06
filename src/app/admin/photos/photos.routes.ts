import {Route} from "@angular/router";
import {PhotosComponent} from "./photos.component";

export default [
  { path: '', component: PhotosComponent, data: {id: 'admin-photos' } },
] as Route[]
