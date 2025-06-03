import { Routes } from "@angular/router";
import { GuestLayoutComponent } from "./layouts/guest-layout/guest-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

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
        path: '**',
        redirectTo: 'home',
      }
    ]
  }



];

export default guestRoutes;
