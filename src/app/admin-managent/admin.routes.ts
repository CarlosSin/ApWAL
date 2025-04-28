import { Routes } from '@angular/router';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { LibraryManagementComponent } from './pages/library-management/library-management.component';
import { AnimalManagementComponent } from './pages/animal-management/animal-management.component';

export const adminRoutes: Routes = [

  {
    path: '',
    children:[
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
        path: '**',
        redirectTo: 'users',
      }
    ]
  }

];
