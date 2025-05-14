import { Routes } from '@angular/router';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { LibraryManagementComponent } from './pages/library-management/library-management.component';
import { AnimalManagementComponent } from './pages/animal-management/animal-management.component';
import { ProtocolsManagementComponent } from './pages/protocols-management/protocols-management.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const adminRoutes: Routes = [

  {
    path: '',
    component: AdminLayoutComponent,
    children:[
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'users',
        title: 'Gestor de usuarios',
        component: UsersManagementComponent
      },
      {
        path: 'library',
        title: 'Gestor de biblioteca',
        component: LibraryManagementComponent
      },
      {
        path: 'animal',
        title: 'Gestor de animales',
        component: AnimalManagementComponent
      },
      {
        path: 'protocol',
        title: 'Gestor de protocolos UPEAL',
        component: ProtocolsManagementComponent
      },
      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  }

];
export default adminRoutes;
