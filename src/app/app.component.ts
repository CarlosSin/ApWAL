import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import KTComponents from '../metronic/core/index';
import KTLayout from '../metronic/app/layouts/demo1';
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'ApWAL';


  ngAfterViewInit(): void {
    KTComponents.init();
    KTLayout.init();
  }
}
