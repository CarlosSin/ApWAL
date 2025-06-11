import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MostrarAnimalesComponent} from '../mostrar-animales/mostrar-animales.component'; 

interface animlarules {
  linea:string,
  ID_especie:number,
  ID_cepa:number,
  ID_sexo:number,
  ID_edadopeso:number,
  disponibilidad:boolean,
}

@Component({
  selector: 'app-agregar-animal-catalogo',
  imports: [CommonModule, FormsModule,MostrarAnimalesComponent],
  templateUrl: './agregar-animal-catalogo.component.html',
})
export class AgregarAnimalCatalogoComponent { 

  mostrarFormulario = false;

  nuevoAnimal:animlarules={
    linea: '',
    ID_especie: 0,
    ID_cepa: 0,
    ID_sexo: 0,
    ID_edadopeso: 0,
    disponibilidad: false
  }

  listaAnimales:animlarules [] = [];//lista de 01-procedimientos experimentales
 
  abrirFormulario() {
    console.log('¡Botón presionado!');
    this.mostrarFormulario = true;
  }
  
  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  agregarAnimal() {
    if (this.nuevoAnimal.linea && this.nuevoAnimal.ID_cepa) {
      this.listaAnimales.push({ ...this.nuevoAnimal });
      this.nuevoAnimal = { 
      linea: '',
      ID_especie: 0,
      ID_cepa: 0,
      ID_sexo: 0,
      ID_edadopeso: 0,
      disponibilidad: false
      };
      this.cerrarFormulario();
    }
  }


}
