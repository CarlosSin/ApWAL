import { Routes } from "@angular/router";
import { EvaLayoutComponent } from "./layouts/eva-layout/eva-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ReviewedProtocolsComponent } from './pages/reviewed-protocols/reviewed-protocols.component';
import { ToReviewProtocolsComponent } from "./pages/to-review-protocols/to-review-protocols.component";
import { AllProtocolsComponent } from "./pages/all-protocols/all-protocols.component";


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
        path: 'reviewed',
        component: ReviewedProtocolsComponent,
      },
      {
        path: 'to-review',
        component: ToReviewProtocolsComponent,
      },
      {
        path: 'general',
        component: AllProtocolsComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  }

];

export default evaRoutes;
