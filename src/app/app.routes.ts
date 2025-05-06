import { Routes } from '@angular/router';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';

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
    path:'**',
    redirectTo: '',
  }

];

