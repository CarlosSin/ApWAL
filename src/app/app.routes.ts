import { Routes } from '@angular/router';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { LibraryPageComponent } from './shared/pages/library-page/library-page.component';

export const routes: Routes = [

  {
    path:'',
    component: LoginPageComponent,
  },
  {
    path: 'inv',
    loadChildren: () => import('./inv-pages/inv.routes'),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-managent/admin.routes'),
  },
  {
    path:'library',
    component: LibraryPageComponent,
    title: 'Biblioteca digital'
  },
  {
    path:'**',
    redirectTo: '',
  }

];

