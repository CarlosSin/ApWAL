import { Routes } from '@angular/router';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { LibraryManagementComponent } from './pages/library-management/library-management.component';
import { AnimalManagementComponent } from './pages/animal-management/animal-management.component';
import { ProtocolsManagementComponent } from './pages/protocols-management/protocols-management.component';
import { DepartmentManagementComponent } from './pages/department-management/department-management.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {AgregarAnimalCatalogoComponent} from '../admin-managent/pages/animal-management/agregar-animal-catalogo/agregar-animal-catalogo.component';
import {AgregarAtributoComponent} from '../admin-managent/pages/animal-management/agregar-atributo/agregar-atributo.component';
import {AgregarEspecieComponent} from '../admin-managent/pages/animal-management/agregar-atributo/agregar-especie/agregar-especie.component';
import {AgregarCepaComponent} from '../admin-managent/pages/animal-management/agregar-atributo/agregar-cepa/agregar-cepa.component';
import {AgregarSexoComponent} from '../admin-managent/pages/animal-management/agregar-atributo/agregar-sexo/agregar-sexo.component';
import {AgregarEdadopesoComponent} from '../admin-managent/pages/animal-management/agregar-atributo/agregar-edadopeso/agregar-edadopeso.component';
import {ModificarAnimalCatalogoComponent} from '../admin-managent/pages/animal-management/modificar-animal-catalogo/modificar-animal-catalogo.component';
import {ModificarAtributoComponent} from '../admin-managent/pages/animal-management/modificar-atributo/modificar-atributo.component';
import {CrearUsuarioComponent} from '../admin-managent/pages/users-management/crear-usuario/crear-usuario.component';
import {CrearEvaluadorComponent} from '../admin-managent/pages/users-management/crear-usuario/crear-evaluador/crear-evaluador.component';
import {CrearInvestigadorComponent} from '../admin-managent/pages/users-management/crear-usuario/crear-investigador/crear-investigador.component';
import {CrearSuplenteComponent} from '../admin-managent/pages/users-management/crear-usuario/crear-suplente/crear-suplente.component';
import {ModificarUsuarioComponent} from '../admin-managent/pages/users-management/modificar-usuario/modificar-usuario.component';
import {BienvenidaInvestigadorComponent} from './pages/home-page/bienvenida-investigador/bienvenida-investigador.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
 
export const adminRoutes: Routes = [

  {
    path: '',
    component: AdminLayoutComponent,
    children:[
      {
        path: 'home',
        component: HomePageComponent,
        title: 'inicio-admin',
        children:[
        {path: 'bienvenida', title: 'Welcome page', component: BienvenidaInvestigadorComponent },
        {path: 'nuevo-usuario1',
          component: CrearUsuarioComponent,
          children: [
          {path: 'nuevo-investigador', component: CrearInvestigadorComponent},
          {path: 'nuevo-suplente', component: CrearSuplenteComponent},
          {path: 'nuevo-evaluador', component: CrearEvaluadorComponent},
          {
            path: '**',
            redirectTo: 'home',
          }
          ]
        },






        {
          path: '**',
          redirectTo: 'bienvenida',
          }
        ]
      },
      {
        path: 'users',
        title: 'Gestor de usuarios',
        component: UsersManagementComponent
      },
      { 
        path: 'nuevo-usuario', 
        component: CrearUsuarioComponent,
          children: [
          {path: 'nuevo-investigador', component: CrearInvestigadorComponent},
          {path: 'nuevo-suplente', component: CrearSuplenteComponent},
          {path: 'nuevo-evaluador', component: CrearEvaluadorComponent},
          {
            path: '**',
            redirectTo: 'home',
          }
        ]
      },
      {
        path: 'modificar-usuario', 
        component: ModificarUsuarioComponent
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
        path:'agregar-animal',
        component: AgregarAnimalCatalogoComponent
      },
      {
        path:'modificar-animal',
        component: ModificarAnimalCatalogoComponent
      },
      {
        path:'agregar-atributo',
        component: AgregarAtributoComponent,
          children: [
          {path: 'agregar-especie', component: AgregarEspecieComponent},
          {path: 'agregar-cepa', component: AgregarCepaComponent},
          {path: 'agregar-sexo', component: AgregarSexoComponent},
          {path: 'agregar-edadopeso', component: AgregarEdadopesoComponent},
          {
            path: '**',
            redirectTo: 'home',
          }
        ]
      },
      {
        path:'modificar-atributo',
        component: ModificarAtributoComponent
      },
      {
        path: 'protocol',
        title: 'Gestor de protocolos UPEAL',
        component: ProtocolsManagementComponent
      },
      {
        path: 'department',
        title: 'Gestor de departamentos',
        component: DepartmentManagementComponent
      },

      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  }

];
export default adminRoutes;
