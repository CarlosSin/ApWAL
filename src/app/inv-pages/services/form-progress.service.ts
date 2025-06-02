import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormProgressService {
private completedSections = new Set<string>();

  markComplete(section: string) {
    this.completedSections.add(section);
  }

  isComplete(section: string): boolean {
    return this.completedSections.has(section);
  }

  // Orden de secciones
  private sectionOrder = [
    'datos-personales',
    'datos-generales',
    'descripcion-animal',
    'procedimientos',
    'alternativas',
    'agentes-ATA',
    'eutanasia',
    'clasificacion',
    'capacitacion',
    'salud-ocupacional',
    'confirmacion'
  ];

  // Permitir navegación solo si la sección anterior fue completada
  canAccess(section: string): boolean {
    const index = this.sectionOrder.indexOf(section);
    if (index === 0) return true;
    const previous = this.sectionOrder[index - 1];
    return this.isComplete(previous);
  }

  getCompletedSections(): Set<string> {
    return this.completedSections;
  }
}
