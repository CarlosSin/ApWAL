import { Component,inject, OnInit } from '@angular/core';
import { AnimalService, ceparules, especierules } from '../../atributo.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar-cepa',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './mostrar-cepa.component.html',
})
export class MostrarCepaComponent implements OnInit{
  private animalService = inject(AnimalService);
  cepadb: ceparules[] = [];
  
  ngOnInit(): void {
    this.animalService.getcepa().subscribe(data => {
      console.log('Usuarios recibidos:', data);
      this.cepadb = data;
    });
  }
}

/**



 */