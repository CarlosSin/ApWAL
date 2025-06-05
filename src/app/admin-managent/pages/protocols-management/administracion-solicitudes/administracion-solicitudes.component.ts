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
  edo_solicitud:boolean,
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

  // Crear una nueva solicitud
  nuevaSolicitud: solicitudrule[] = [
    {ID_protocolo: 0, nombre_protocolo: "animalitos del bosque", nombre_investigador: "juan lopez", seccion: 1, tipo_solicitud: "modificacion", fecha: "01-06-2025", peticion: "Se solicita modificar la fecha de entrega gracias", edo_solicitud: null},
    {ID_protocolo: 1, nombre_protocolo: "animalitos del bosque2", nombre_investigador: "berenice lopez", seccion: 3, tipo_solicitud: "actualizacion", fecha: "01-06-2025", peticion: "Se solicita actualizar datos del suplente", edo_solicitud: false},
    {ID_protocolo: 3, nombre_protocolo: "bioterios", nombre_investigador: "antonieta ruiz", seccion: 5, tipo_solicitud: "agregacion", fecha: "01-06-2025", peticion: "Se solicita agregar mas animales al protocolo", edo_solicitud: true},
    {ID_protocolo: 5, nombre_protocolo: "animasdfsdfsdf", nombre_investigador: "juan lopez", seccion: 1, tipo_solicitud: "cambio de investigador", fecha: "01-06-2025", peticion: "Se solicita modicar el investifgador", edo_solicitud: false},
    {ID_protocolo: 36, nombre_protocolo: "cancer animal", nombre_investigador: "antonieta ruiz", seccion: 5, tipo_solicitud: "cambio de agentes ata", fecha: "01-06-2025", peticion: "Se solicita cambiar los agentes ata", edo_solicitud: null},

  ];
  
  constructor(){
      this.clasificarsolicitudes();
  }

  clasificarsolicitudes(){
    //cuando la solicitud esta en revicion
    for (let solicitud of this.nuevaSolicitud) {
      if(solicitud.edo_solicitud===null){
        this.lista_solicitud_revicion.push({ ...solicitud});
      }else if (solicitud.edo_solicitud===true){
        this.lista_solicitud_aprovada.push({ ...solicitud });
      } else if(solicitud.edo_solicitud===false){
        this.lista_solicitud_rechazada.push({ ...solicitud });
      }
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
