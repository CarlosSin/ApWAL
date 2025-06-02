import { Routes } from "@angular/router";
import { EvaLayoutComponent } from "./layouts/eva-layout/eva-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";


export const evaRoutes: Routes = [
  {
    path: '',
    component: EvaLayoutComponent,
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

export default evaRoutes;
