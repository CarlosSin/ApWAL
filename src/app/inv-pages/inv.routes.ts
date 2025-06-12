import { Routes } from "@angular/router";
import { ApprovedProtocolsComponent } from "./pages/protocolos/approved-protocols/approved-protocols.component";
import { UnapprovedProtocolsComponent } from "./pages/protocolos/unapproved-protocols/unapproved-protocols.component";
import { ProtocolRegisterComponent } from "./pages/protocol-register/protocol-register.component";
import { PilotRegisterComponent } from "./pages/pilot-register/pilot-register.component";
import { InvLayoutComponent } from "./layouts/inv-layout/inv-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { AllProtocolsComponent } from "./pages/protocolos/all-protocols/all-protocols.component";
import { RecomendationProtocolsComponent } from "./pages/protocolos/recomendation-protocols/recomendation-protocols.component";
import { UnfinishedProtocolsComponent } from "./pages/protocolos/unfinished-protocols/unfinished-protocols.component";
import { UnderreviewProtocolsComponent } from "./pages/protocolos/underreview-protocols/underreview-protocols.component";
import { DatosGeneralesComponent } from "./pages/protocol-register/protocol-modules/datos-generales/datos-generales.component";
import { DatosPersonalesComponent } from "./pages/protocol-register/protocol-modules/datos-personales/datos-personales.component";
import { DescripcionAnimalComponent } from "./pages/protocol-register/protocol-modules/descripcion-animal/descripcion-animal.component";
import { ProcExperimentalesComponent } from "./pages/protocol-register/protocol-modules/proc-experimentales/proc-experimentales.component";
import { AlternativasComponent } from "./pages/protocol-register/protocol-modules/alternativas/alternativas.component";
import { AgentesAtaComponent } from "./pages/protocol-register/protocol-modules/agentes-ata/agentes-ata.component";
import { EutanasiaComponent } from "./pages/protocol-register/protocol-modules/eutanasia/eutanasia.component";
import { ClasificacionComponent } from "./pages/protocol-register/protocol-modules/clasificacion/clasificacion.component";
import { CapacitacionComponent } from "./pages/protocol-register/protocol-modules/capacitacion/capacitacion.component";
import { SaludOcupacionalComponent } from "./pages/protocol-register/protocol-modules/salud-ocupacional/salud-ocupacional.component";
import { ConfirmacionComponent } from "./pages/protocol-register/protocol-modules/confirmacion/confirmacion.component";
import { DatosPersonalesPComponent } from "./pages/pilot-register/pilot-modules/datos-personales/datos-personales.component";
import { DatosGeneralesPComponent } from "./pages/pilot-register/pilot-modules/datos-generales/datos-generales.component";
import { DescripcionAnimalPComponent } from "./pages/pilot-register/pilot-modules/descripcion-animal/descripcion-animal.component";
import { ProcExperimentalesPComponent } from "./pages/pilot-register/pilot-modules/proc-experimentales/proc-experimentales.component";
import { AlternativasPComponent } from "./pages/pilot-register/pilot-modules/alternativas/alternativas.component";
import { AgentesAtaPComponent } from "./pages/pilot-register/pilot-modules/agentes-ata/agentes-ata.component";
import { EutanasiaPComponent } from "./pages/pilot-register/pilot-modules/eutanasia/eutanasia.component";
import { ClasificacionPComponent } from "./pages/pilot-register/pilot-modules/clasificacion/clasificacion.component";
import { CapacitacionPComponent } from "./pages/pilot-register/pilot-modules/capacitacion/capacitacion.component";
import { SaludOcupacionalPComponent } from "./pages/pilot-register/pilot-modules/salud-ocupacional/salud-ocupacional.component";
import { ConfirmacionPComponent } from "./pages/pilot-register/pilot-modules/confirmacion/confirmacion.component";
import { AllPilotComponent } from "./pages/estudios-piloto/all-pilot/all-pilot.component";
import { ApprovedPilotComponent } from "./pages/estudios-piloto/approved-pilot/approved-pilot.component";
import { UnapprovedPilotComponent } from "./pages/estudios-piloto/unapproved-pilot/unapproved-pilot.component";
import { RecomendationPilotComponent } from "./pages/estudios-piloto/recomendation-pilot/recomendation-pilot.component";
import { UnfinishedPilotComponent } from "./pages/estudios-piloto/unfinished-pilot/unfinished-pilot.component";
import { UnderreviewPilotComponent } from "./pages/estudios-piloto/underreview-pilot/underreview-pilot.component";

export const invRoutes: Routes = [
  {
    path: '',
    component: InvLayoutComponent,
    children:[
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'general-protocol',
        component: AllProtocolsComponent
      },
      {
        path: 'approved-protocol',
        component: ApprovedProtocolsComponent
      },
      {
        path: 'unapproved-protocol',
        component:UnapprovedProtocolsComponent
      },
      {
        path: 'recomendations-protocol',
        component:RecomendationProtocolsComponent
      },
      {
        path: 'unfinished-protocol',
        component:UnfinishedProtocolsComponent
      },
      {
        path: 'underreview-protocol',
        component:UnderreviewProtocolsComponent
      },
      {
        path: 'general-pilot',
        component: AllPilotComponent
      },
      {
        path: 'approved-pilot',
        component: ApprovedPilotComponent
      },
      {
        path: 'unapproved-pilot',
        component:UnapprovedPilotComponent
      },
      {
        path: 'recomendations-pilot',
        component:RecomendationPilotComponent
      },
      {
        path: 'unfinished-pilot',
        component:UnfinishedPilotComponent
      },
      {
        path: 'underreview-pilot',
        component:UnderreviewPilotComponent
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
        path: 'pilot-register',
        component:PilotRegisterComponent,
        children: [
          {path: 'datos-personales', component: DatosPersonalesPComponent},
          {path: 'datos-generales', component: DatosGeneralesPComponent},
          {path: 'descripcion-animal', component: DescripcionAnimalPComponent},
          {path: 'procedimientos', component: ProcExperimentalesPComponent},
          {path: 'alternativas', component: AlternativasPComponent},
          {path: 'agentes-ATA', component: AgentesAtaPComponent},
          {path: 'eutanasia', component: EutanasiaPComponent},
          {path: 'clasificacion', component: ClasificacionPComponent},
          {path: 'capacitacion', component: CapacitacionPComponent},
          {path: 'salud-ocupacional', component: SaludOcupacionalPComponent},
          {path: 'confirmacion', component: ConfirmacionPComponent},
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
  },

];

export default invRoutes;
