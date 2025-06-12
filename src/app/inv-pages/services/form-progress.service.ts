import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormProgressService {
  private completedSections = new Set<string>();

  // 🔹 NUEVO: ID del protocolo en memoria
  private protocoloId: number | null = null;

  // 🔹 Métodos para manipular el ID
  setProtocoloId(id: number) {
    if (id !== null && !isNaN(id)) {
      this.protocoloId = Number(id); // Fuerza conversión a número
    }
  }

  getProtocoloId(): number | null {
    return this.protocoloId;
  }

  clearProtocoloId() {
    this.protocoloId = null;
  }

  markComplete(section: string) {
    this.completedSections.add(section);
  }

  isComplete(section: string): boolean {
    return this.completedSections.has(section);
  }

  private sectionOrder = [
    'datos-personales',
    'datos-generales',
    'descripcion-animal',
    'procedimientos',
    'alternativas',
    'agentes-ATA',
    'eutanasia',
    'clasificacion',
    //'capacitacion',
    'salud-ocupacional',
    'confirmacion'
  ];

  canAccess(section: string): boolean {
    const index = this.sectionOrder.indexOf(section);
    if (index === 0) return true;
    const previous = this.sectionOrder[index - 1];
    return this.isComplete(previous);
  }

  getCompletedSections(): Set<string> {
    return this.completedSections;
  }
  resetProgreso() {
  this.completedSections.clear();
  this.protocoloId = null;
}
}
