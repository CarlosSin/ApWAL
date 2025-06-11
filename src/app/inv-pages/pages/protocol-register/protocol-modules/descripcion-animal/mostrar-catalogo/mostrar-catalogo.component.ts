import { Component, inject, OnInit } from '@angular/core';
import { AnimalService ,animalesrules} from '../animal.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrar-catalogo',
  imports: [CommonModule,FormsModule,HttpClientModule],
  standalone: true, // Si tu componente es standalone
  templateUrl: './mostrar-catalogo.component.html',
})
export class MostrarCatalogoComponent implements OnInit{ 
private animalService = inject(AnimalService);
  animaldb: animalesrules [] = [];
  filteredAnimaldb: animalesrules[] = []; // Almacena los animales filtrados

  // Variables para los valores seleccionados de los filtros
  selectedEspecie: string = '';
  selectedCepa: string = '';
  selectedSexo: string = '';
  selectedEdadPeso: string = '';

  // Listas de valores únicos para poblar los dropdowns de filtro
  uniqueEspecies: string[] = [];
  uniqueCepa: string[] = [];
  uniqueSexo: string[] = [];
  uniqueEdadPeso: string[] = [];
  
  //Límite fijo de animales a mostrar
  private readonly DISPLAY_LIMIT: number = 6; // Por ejemplo, 6 animales
  
  ngOnInit(): void {
    this.animalService.getanimal().subscribe(data => {
    console.log('Usuarios recibidos:', data);
    this.animaldb = data;
    this.populateFilterOptions();
    this.applyFilters(); // Llenar las opciones de filtro
  });
  }

   // Función para obtener los valores únicos para los filtros
  populateFilterOptions(): void {
    this.uniqueEspecies = this.getUniqueValues('nombre_especie');
    this.uniqueCepa = this.getUniqueValues('nombre_cepa');
    this.uniqueSexo = this.getUniqueValues('nombre_sexo');
    this.uniqueEdadPeso = this.getUniqueValues('nombre_edadopeso');
  }

  // Función auxiliar para obtener valores únicos de una propiedad
  getUniqueValues(key: keyof animalesrules): string[] {
    return [...new Set(this.animaldb.map(item => item[key] as string))].sort();
  }

  // Función para aplicar los filtros
  applyFilters(): void {
    let tempFilteredAnimals = this.animaldb.filter(animal => {
      // Filtrar por especie
      if (this.selectedEspecie && animal.nombre_especie !== this.selectedEspecie) {
        return false;
      }
      // Filtrar por cepa
      if (this.selectedCepa && animal.nombre_cepa !== this.selectedCepa) {
        return false;
      }
      // Filtrar por sexo
      if (this.selectedSexo && animal.nombre_sexo !== this.selectedSexo) {
        return false;
      }
      // Filtrar por edad o peso
      if (this.selectedEdadPeso && animal.nombre_edadopeso !== this.selectedEdadPeso) {
        return false;
      }
      return true; // Si pasa todos los filtros, incluir el animal
    });

    this.filteredAnimaldb = tempFilteredAnimals.slice(0, this.DISPLAY_LIMIT);
  }
}
