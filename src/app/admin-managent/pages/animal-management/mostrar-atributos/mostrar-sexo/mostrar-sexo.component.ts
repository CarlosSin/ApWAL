import { Component,inject, OnInit } from '@angular/core';
import { AnimalService, especierules, sexorules } from '../../atributo.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mostrar-sexo',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './mostrar-sexo.component.html',
})
export class MostrarSexoComponent implements OnInit{

  private animalService = inject(AnimalService);
  sexodb: sexorules[] = [];
  
  ngOnInit(): void {
    this.animalService.getsexo().subscribe(data => {
      console.log('Usuarios recibidos:', data);
      this.sexodb = data;
    });
  } 
}
