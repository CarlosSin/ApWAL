import { Routes } from '@angular/router';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { LibraryPageComponent } from './shared/pages/library-page/library-page.component';
import { AuthGuard } from './guards/auth.guard'; // 👈 Asegúrate de importar

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-managent/admin.routes'),
    canActivate: [AuthGuard],
    data: { roles: ['Administrador'] }
  },
  {
    path: 'inv',
    loadChildren: () => import('./inv-pages/inv.routes'),
    canActivate: [AuthGuard],
    data: { roles: ['Investigador'] }
  },
  {
    path: 'eva',
    loadChildren: () => import('./eva-pages/eva.routes'),
    canActivate: [AuthGuard]
  },
  {
    path: 'guest',
    loadChildren: () => import('./guest-pages/guest.routes'),
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    component: LibraryPageComponent,
    title: 'Biblioteca digital',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }
];
