import { Component,inject, OnInit } from '@angular/core';
import { AnimalService, especierules } from '../../atributo.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar-especie',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './mostrar-especie.component.html',
})
export class MostrarEspecieComponent implements OnInit{ 
  private animalService = inject(AnimalService);
  especiedb: especierules[] = [];
  
  ngOnInit(): void {
    this.animalService.getespecie().subscribe(data => {
      console.log('Usuarios recibidos:', data);
      this.especiedb = data;
    });
}
}