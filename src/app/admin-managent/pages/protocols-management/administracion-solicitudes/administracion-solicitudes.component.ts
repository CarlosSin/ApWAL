import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface solicitudrule{
  ID_protocolo:number,
  nombre_protocolo:string,
  nombre_investigador:string,
  seccion:number,
  tipo_solicitud:string,
  fecha:string
  peticion:string,
  edo_solicitud:boolean
}

@Component({
  selector: 'app-administracion-solicitudes',
  imports: [CommonModule, FormsModule],
  templateUrl: './administracion-solicitudes.component.html',
})
export class AdministracionSolicitudesComponent {

  //obtencion de las solicitudes por ceparado
  lista_solicitud_revicion: solicitudrule [] = [];//lista de solicitudes en revicion
  lista_solicitud_aprovada:solicitudrule [] = [];// lsita de solicitudes aprovadas
  lista_solicitud_rechazada:solicitudrule [] = [];// lsita de solicitudes aprovadas

} 

/*

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
