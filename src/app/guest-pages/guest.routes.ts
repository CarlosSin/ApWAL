import { Routes } from "@angular/router";
import { GuestLayoutComponent } from "./layouts/guest-layout/guest-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ProtocolRegisterComponent } from "./pages/protocol-register/protocol-register.component";
import { DatosPersonalesComponent } from "./pages/protocol-register/protocol-modules/datos-personales/datos-personales.component";
import { DatosGeneralesComponent } from "./pages/protocol-register/protocol-modules/datos-generales/datos-generales.component";
import { DescripcionAnimalComponent } from "./pages/protocol-register/protocol-modules/descripcion-animal/descripcion-animal.component";
import { ProcExperimentalesComponent } from "./pages/protocol-register/protocol-modules/proc-experimentales/proc-experimentales.component";
import { AlternativasComponent } from "./pages/protocol-register/protocol-modules/alternativas/alternativas.component";
import { AgentesAtaComponent } from "./pages/protocol-register/protocol-modules/agentes-ata/agentes-ata.component";
import { EutanasiaComponent } from "./pages/protocol-register/protocol-modules/eutanasia/eutanasia.component";
import { ClasificacionComponent } from "./pages/protocol-register/protocol-modules/clasificacion/clasificacion.component";
import { CapacitacionComponent } from "./pages/protocol-register/protocol-modules/capacitacion/capacitacion.component";
import { SaludOcupacionalComponent } from "./pages/protocol-register/protocol-modules/salud-ocupacional/salud-ocupacional.component";
import { ConfirmacionComponent } from "./pages/protocol-register/protocol-modules/confirmacion/confirmacion.component";

export const guestRoutes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children:[
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
              path: 'protocol-register',
              component:ProtocolRegisterComponent,
              children: [
                {path: 'datos-personales', component: DatosPersonalesComponent},
                {path: 'datos-generales', component: DatosGeneralesComponent},
                {path: 'descripcion-animal', component: DescripcionAnimalComponent},
                {path: 'procedimientos', component: ProcExperimentalesComponent},
                {path: 'alternativas', component: AlternativasComponent},
                {path: 'agentes-ATA', component: AgentesAtaComponent},
                {path: 'eutanasia', component: EutanasiaComponent},
                {path: 'clasificacion', component: ClasificacionComponent},
                {path: 'capacitacion', component: CapacitacionComponent},
                {path: 'salud-ocupacional', component: SaludOcupacionalComponent},
                {path: 'confirmacion', component: ConfirmacionComponent},
                {
                  path: '**',
                  redirectTo: 'datos-personales',
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

export default guestRoutes;
