import { Routes } from "@angular/router";
import { ApprovedProtocolsComponent } from "./pages/approved-protocols/approved-protocols.component";
import { UnapprovedProtocolsComponent } from "./pages/unapproved-protocols/unapproved-protocols.component";
import { ProtocolRegisterComponent } from "./pages/protocol-register/protocol-register.component";
import { PilotRegisterComponent } from "./pages/pilot-register/pilot-register.component";
import { InvLayoutComponent } from "./layouts/inv-layout/inv-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

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
        path: 'approved',
        component: ApprovedProtocolsComponent
      },
      {
        path: 'unapproved',
        component:UnapprovedProtocolsComponent
      },
      {
        path: 'protocol-register',
        component:ProtocolRegisterComponent
      },
      {
        path: 'pilot-register',
        component:PilotRegisterComponent
      },

      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  },

];

export default invRoutes;
