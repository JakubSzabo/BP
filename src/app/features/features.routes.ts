import { Route } from '@angular/router';

export default [
  {
    path: "",
    loadChildren: () => import('./home/home.routes')
  },
  {
    path: "about",
    loadChildren: () => import('./about/about.routes')
  },
  {
    path: "gallery",
    loadChildren: () => import('./gallery/gallery.routes')
  },
  {
    path: "events",
    loadChildren: () => import('./events/events.routes')
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.routes')
  },
] as Route[];
