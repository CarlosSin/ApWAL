import { Routes } from '@angular/router';
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
import {BienvenidaInvestigadorComponent} from './pages/home-page/bienvenida-investigador/bienvenida-investigador.component';
import {UsersManagementComponent} from '../admin-managent/pages/users-management/users-management.component';
import {RevisiónProtocoloComponent} from '../admin-managent/pages/protocols-management/revisión-protocolo/revisión-protocolo.component';
import {AdministracionSolicitudesComponent} from '../admin-managent/pages/protocols-management/administracion-solicitudes/administracion-solicitudes.component';
import {MostrarAtributosComponent} from '../admin-managent/pages/animal-management/mostrar-atributos/mostrar-atributos.component';
import {MostrarEspecieComponent} from '../admin-managent/pages/animal-management/mostrar-atributos/mostrar-especie/mostrar-especie.component';
import {MostrarCepaComponent} from '../admin-managent/pages/animal-management/mostrar-atributos/mostrar-cepa/mostrar-cepa.component';
import {MostrarSexoComponent} from '../admin-managent/pages/animal-management/mostrar-atributos/mostrar-sexo/mostrar-sexo.component';
import {MostrarEdadopesoComponent} from '../admin-managent/pages/animal-management/mostrar-atributos/mostrar-edadopeso/mostrar-edadopeso.component';
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
        {path: 'gestion-usuario', title: 'Gestion de usuarios', component: UsersManagementComponent,},
        {path: 'library1', title: 'Gestor de biblioteca', component: LibraryManagementComponent},
        {path:'agregar-atributo', 
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
        {path:'modificar-atributo', component: ModificarAtributoComponent},
        {path:'agregar-animal',component: AgregarAnimalCatalogoComponent},
        {path:'modificar-animal', component: ModificarAnimalCatalogoComponent},
        {
        path: 'departmento',
        title: 'Gestor de departamentos',
        component: DepartmentManagementComponent
        },
        {
        path: 'protocol',
        title: 'Gestor de protocolos UPEAL',
        component: ProtocolsManagementComponent,
        children:[
          {path: 'revision-protocolos', title: 'revision-protocolos', component: RevisiónProtocoloComponent},
          {path: 'admon-solicitudes', title: 'Administación de solicitudes', component: AdministracionSolicitudesComponent},
        ]
        },
        {
        path: 'mostrar-atributos',
        title: 'Gestor de atributos',
        component: MostrarAtributosComponent,
        children:[
          {path: 'mostrar-especie', title: 'revision-protocolos', component: MostrarEspecieComponent},
          {path: 'mostrar-cepa', title: 'Administación de solicitudes', component: MostrarCepaComponent},
          {path: 'mostrar-sexo', title: 'Administación de solicitudes', component: MostrarSexoComponent},
          {path: 'mostrar-edadopeso', title: 'Administación de solicitudes', component: MostrarEdadopesoComponent },
        ]
        },
        {
          path: '**',
          redirectTo: 'bienvenida',
          }
        ]
      },

      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  }

];
export default adminRoutes;
