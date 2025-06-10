import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-library-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './library-management.component.html'
})
export class LibraryManagementComponent implements OnInit {
  mostrarFormulario = false;

  // Lista de recursos mostrados
  listaRecursos: any[] = [];

  // Lista de tipos de recurso (para el select)
  tiposRecurso: any[] = [];

  // Modelo para formulario
  nuevoRecurso: any = {
    nombre: '',
    descripcion: '',
    tipo: '',
    archivo: null
  };

  recursoEditando: any = null;
  modoEdicion: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarRecursos();
    this.cargarTiposRecurso();
  }

  cargarRecursos(): void {
    this.http.get<any[]>('http://localhost:3000/api/recursos')
      .subscribe({
        next: data => this.listaRecursos = data,
        error: err => console.error('Error al cargar recursos:', err)
      });
  }

  cargarTiposRecurso(): void {
    this.http.get<any[]>('http://localhost:3000/api/recursos/tipos')
      .subscribe({
        next: data => this.tiposRecurso = data,
        error: err => console.error('Error al cargar tipos de recurso:', err)
      });
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.modoEdicion = false;
    this.recursoEditando = null;
    this.nuevoRecurso = {
      nombre: '',
      descripcion: '',
      tipo: '',
      archivo: null
    };
  }


  capturarArchivo(event: any): void {
    const file = event.target.files[0];
    if (this.modoEdicion) {
      this.recursoEditando.archivo = file;
    } else {
      this.nuevoRecurso.archivo = file;
    }
  }

  guardarRecurso(): void {
  const formData = new FormData();
  formData.append('nombre', this.nuevoRecurso.nombre);
  formData.append('descripcion', this.nuevoRecurso.descripcion);
  formData.append('tipo', this.nuevoRecurso.tipo);

  if (this.nuevoRecurso.archivo) {
    formData.append('archivo', this.nuevoRecurso.archivo);
  }

  if (this.modoEdicion && this.recursoEditando) {
    // PUT para editar
    this.http.put(`http://localhost:3000/api/recursos/${this.recursoEditando.ID_recurso}`, formData)
      .subscribe({
        next: () => {
          this.cargarRecursos();
          this.cerrarFormulario();
        },
        error: err => console.error('Error al modificar recurso:', err)
      });
  } else {
    // POST para agregar nuevo
    this.http.post('http://localhost:3000/api/recursos', formData)
      .subscribe({
        next: () => {
          this.cargarRecursos();
          this.cerrarFormulario();
        },
        error: err => console.error('Error al agregar recurso:', err)
      });
  }
}



  eliminarRecurso(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este recurso?')) return;

    this.http.delete(`http://localhost:3000/api/recursos/${id}`)
      .subscribe({
        next: () => this.cargarRecursos(),
        error: err => console.error('Error al eliminar recurso:', err)
      });
  }

  // Variables para editar recurso

  editarRecurso(recurso: any) {
    this.mostrarFormulario = true;
    this.modoEdicion = true;
    this.recursoEditando = recurso;

    // const tipoId = this.obtenerIDTipoPorNombre(recurso.tipo);
    // if (!tipoId) {
    //   console.error('No se encontró el ID del tipo para:', recurso.tipo);
    // }

    this.nuevoRecurso = {
      nombre: recurso.nombre,
      descripcion: recurso.descripcion,
      tipo: this.obtenerIDTipoPorNombre(recurso.tipo),
      archivo: null
    };


    // console.log('nuevoRecurso:', this.nuevoRecurso);
  }

  obtenerIDTipoPorNombre(nombre: string): number | null {
    const tipoEncontrado = this.tiposRecurso.find(tipo => tipo.nombre === nombre);
    return tipoEncontrado ? tipoEncontrado.ID_tipo_recurso : null;
  }




}
