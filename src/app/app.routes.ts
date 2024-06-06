import { Routes } from '@angular/router';
import { LayoutComponent } from "./core/layout/layout.component";
import { AdminLayoutComponent } from "./admin/admin-layout/admin-layout.component";
import { NotFoundComponent } from "./core/not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./features/features.routes'),
  },
  {
    path: 'login',
    loadChildren: () => import('./core/login/login.routes'),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin/admin.routes'),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
