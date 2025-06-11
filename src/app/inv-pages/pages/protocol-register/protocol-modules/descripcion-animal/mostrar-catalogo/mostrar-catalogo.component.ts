import { Component, inject, OnInit } from '@angular/core';
import { AnimalService, animalesrules } from '../animal.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DescripcionAnimalService } from '../../../../../services/descripcion-animal.service';
import { FormProgressService } from '../../../../../services/form-progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './mostrar-catalogo.component.html',
})
export class MostrarCatalogoComponent implements OnInit {
  private animalService = inject(AnimalService);
  private descripcionService = inject(DescripcionAnimalService);
  private formProgressService = inject(FormProgressService);
  private router = inject(Router);

  protocoloId: number | null = null;
  modoEdicion: boolean = false;

  animaldb: animalesrules[] = [];
  filteredAnimaldb: animalesrules[] = [];

  animalesSeleccionados: any[] = [];
  justificacion: string = '';
  alojamiento: string = '';

  selectedEspecie = '';
  selectedCepa = '';
  selectedSexo = '';
  selectedEdadPeso = '';

  uniqueEspecies: string[] = [];
  uniqueCepa: string[] = [];
  uniqueSexo: string[] = [];
  uniqueEdadPeso: string[] = [];

  private readonly DISPLAY_LIMIT = 6;

  ngOnInit(): void {
    this.protocoloId = this.formProgressService.getProtocoloId();

    if (!this.protocoloId) {
      console.warn('No hay ID de protocolo activo.');
      return;
    }

    this.animalService.getanimal().subscribe(data => {
      this.animaldb = data;
      this.populateFilterOptions();
      this.applyFilters();
    });

    // Verificar si ya existe información
    this.descripcionService.obtenerPorProtocolo(this.protocoloId).subscribe({
      next: (res: any) => {
        this.modoEdicion = true;
        this.justificacion = res.descripcion.justificacion;
        this.alojamiento = res.descripcion.alojamiento_animal;
        this.animalesSeleccionados = res.animales.map((a: any) => ({
          linea: a.linea,
          frecuencia_uso: a.frecuencia_uso,
          cantidad: a.cantidad
        }));
      },
      error: () => {
        this.modoEdicion = false;
      }
    });
  }

  populateFilterOptions(): void {
    this.uniqueEspecies = this.getUniqueValues('nombre_especie');
    this.uniqueCepa = this.getUniqueValues('nombre_cepa');
    this.uniqueSexo = this.getUniqueValues('nombre_sexo');
    this.uniqueEdadPeso = this.getUniqueValues('nombre_edadopeso');
  }

  getUniqueValues(key: keyof animalesrules): string[] {
    return [...new Set(this.animaldb.map(item => item[key] as string))].sort();
  }

  agregarAnimal(animal: animalesrules) {
    const yaExiste = this.animalesSeleccionados.find(a => a.linea === animal.linea);
    if (!yaExiste) {
      this.animalesSeleccionados.push({
        linea: animal.linea,
        frecuencia_uso: '',
        cantidad: null,
        nombre_especie: animal.nombre_especie,
        nombre_cepa: animal.nombre_cepa,
        nombre_sexo: animal.nombre_sexo,
        nombre_edadopeso: animal.nombre_edadopeso,
      });
    }
  }

  eliminarAnimal(index: number) {
    this.animalesSeleccionados.splice(index, 1);
  }

  applyFilters(): void {
    let tempFilteredAnimals = this.animaldb.filter(animal => {
      if (this.selectedEspecie && animal.nombre_especie !== this.selectedEspecie) return false;
      if (this.selectedCepa && animal.nombre_cepa !== this.selectedCepa) return false;
      if (this.selectedSexo && animal.nombre_sexo !== this.selectedSexo) return false;
      if (this.selectedEdadPeso && animal.nombre_edadopeso !== this.selectedEdadPeso) return false;
      return true;
    });

    this.filteredAnimaldb = tempFilteredAnimals.slice(0, this.DISPLAY_LIMIT);
  }

  guardar(avanzar: boolean) {
    if (!this.protocoloId) return;

    const payload = {
      ID_registro_protocolo: this.protocoloId,
      justificacion: this.justificacion,
      alojamiento_animal: this.alojamiento,
      animales: this.animalesSeleccionados.map(a => ({
        linea: a.linea,
        frecuencia_uso: a.frecuencia_uso,
        cantidad: a.cantidad
      }))
    };

    const peticion = this.modoEdicion
      ? this.descripcionService.actualizarDescripcion(this.protocoloId, payload)
      : this.descripcionService.guardarDescripcion(payload);

    peticion.subscribe({
      next: () => {
        this.formProgressService.markComplete('descripcion-animal');
        if (avanzar) {
          this.router.navigate(['/inv/protocol-register/procedimientos']);
        }
      },
      error: (err) => {
        console.error('Error al guardar descripción de animal:', err);
      }
    });
  }
}
