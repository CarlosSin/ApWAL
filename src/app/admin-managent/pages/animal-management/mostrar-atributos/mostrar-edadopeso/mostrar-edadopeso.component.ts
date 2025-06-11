import { Component,inject, OnInit } from '@angular/core';
import { AnimalService, edadopesorules, especierules, sexorules } from '../../atributo.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar-edadopeso',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './mostrar-edadopeso.component.html',
})
export class MostrarEdadopesoComponent implements OnInit{
private animalService = inject(AnimalService);
  edadopesodb: edadopesorules[] = [];
  
  ngOnInit(): void {
    this.animalService.getedadopeso().subscribe(data => {
      console.log('Usuarios recibidos:', data);
      this.edadopesodb = data;
    });
  } 
}