import { Route } from '@angular/router';
import {AuthorizationGuard} from "../shared/guard/authorization.guard";

export default [
  {
    path: "",
    loadChildren: () => import('./home/home.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "addNew",
    loadChildren: () => import('./home/add-script/add-script.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "edit/:id",
    loadChildren: () => import('./home/edit-script/edit-script.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "articles",
    loadChildren: () => import('./articles/articles.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "articles/addNew",
    loadChildren: () => import('./articles/add-new/add-new.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "articles/edit/:id",
    loadChildren: () => import('./articles/edit/edit.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "about",
    loadChildren: () => import('./about/about.router'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "settings",
    loadChildren: () => import('./settings/settings.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "contacts",
    loadChildren: () => import('./contacts/contacts.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "photos",
    loadChildren: () => import('./photos/photos.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "forms",
    loadChildren: () => import('./form-table/form-table.routes'),
    canActivate: [AuthorizationGuard]
  },

  {
    path: "create-form",
    loadChildren: () => import('./form-table/form/form.routes'),
    canActivate: [AuthorizationGuard]
  },
  {
    path: "create-form/:id",
    loadChildren: () => import('./form-table/form/form.routes'),
    canActivate: [AuthorizationGuard]
  },
] as Route[];
