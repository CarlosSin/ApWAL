import { Component,inject, OnInit } from '@angular/core';
import { AnimalService ,animalesrules} from '../animal.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-mostrar-animales',
  imports: [CommonModule,HttpClientModule ],
  templateUrl: './mostrar-animales.component.html',
})
export class MostrarAnimalesComponent implements OnInit{ 
  private animalService = inject(AnimalService);
  animaldb: animalesrules [] = [];
  
  ngOnInit(): void {
    this.animalService.getanimal().subscribe(data => {
    console.log('Usuarios recibidos:', data);
    this.animaldb = data;
  });
  }
}