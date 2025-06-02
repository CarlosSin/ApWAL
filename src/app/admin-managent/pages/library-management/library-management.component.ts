import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface archivosrules{
  nombre_archivo:string,
  seccion:number,
  archivo:File,
}

@Component({
  selector: 'app-library-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './library-management.component.html',
})

export class LibraryManagementComponent {
  mostrarFormulario = false;

  nuevoArchivo:archivosrules={
    nombre_archivo: '',
    seccion: 0,
    archivo: undefined,
  }

  listaarchivoS1:archivosrules [] = [];//lista de 01-procedimientos experimentales
  listaarchivoS2:archivosrules [] = [];// lsita de 02-alternativas
  listaarchivosS3:archivosrules [] = [];// lsita de 03-agentes ata
  listaarchivosS4:archivosrules [] = [];// lsita de 04-eutanasia
  listaarchivosS5:archivosrules [] = [];// lsita de 05-clasificacion
  listaarchivosS6:archivosrules [] = [];// lsita de 06-salud ocupacional
 
  abrirFormulario() {
    console.log('¡Botón presionado!');
    this.mostrarFormulario = true;
  }
  
  cerrarFormulario() {
    this.mostrarFormulario = false;
  }
  capturarArchivo(event: any) {
  const archivoSeleccionado = event.target.files[0];
    if (archivoSeleccionado) {
      this.nuevoArchivo.archivo = archivoSeleccionado;
    }
  }

  agregararchivo() {
    if (this.nuevoArchivo.nombre_archivo && this.nuevoArchivo.seccion) {
      
      if(this.nuevoArchivo.seccion==1){ //01-procedimientos experimentales
        this.listaarchivoS1.push({ ...this.nuevoArchivo });
        this.nuevoArchivo = { 
          nombre_archivo: '',
          seccion: 0,
          archivo: undefined
        };
      }

      if(this.nuevoArchivo.seccion==2){//02-alternativas
        this.listaarchivoS2.push({ ...this.nuevoArchivo });
        this.nuevoArchivo = { 
          nombre_archivo: '',
          seccion: 0,
          archivo: undefined
        };
      }
      
      if(this.nuevoArchivo.seccion==3){//03-agentes ata
        this.listaarchivosS3.push({ ...this.nuevoArchivo });
        this.nuevoArchivo = { 
          nombre_archivo: '',
          seccion: 0,
          archivo: undefined
        };
      }

      if(this.nuevoArchivo.seccion==4){//04-eutanasia
        this.listaarchivosS4.push({ ...this.nuevoArchivo });
        this.nuevoArchivo = { 
          nombre_archivo: '',
          seccion: 0,
          archivo: undefined
        };
      }

      if(this.nuevoArchivo.seccion==5){//05-clasificacion
        this.listaarchivosS5.push({ ...this.nuevoArchivo });
        this.nuevoArchivo = { 
          nombre_archivo: '',
          seccion: 0,
          archivo: undefined
        };
      }

      if(this.nuevoArchivo.seccion==6){//06-salud ocupacional
        this.listaarchivosS6.push({ ...this.nuevoArchivo });
        this.nuevoArchivo = { 
          nombre_archivo: '',
          seccion: 0,
          archivo: undefined
        };
      }
      this.cerrarFormulario();
    }
  }

}

/*
secciones posibles
01-procedimientos experimentales
02-alternativas
03-agentes ata
04-eutanasia
05-clasificacion
06-salud ocupacional
*/