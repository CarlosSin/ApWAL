import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface protocolrule{
  ID_protocolo:string,
  nombre_protocolo:string,
  edo_protocolo:string,
  fecha:string,
}


@Component({
  selector: 'app-revisión-protocolo',
  imports: [CommonModule, FormsModule],
  templateUrl: './revisión-protocolo.component.html',
})
export class RevisiónProtocoloComponent { 
  
  lista_protocolo_revicion:protocolrule [] = [];//lista de solicitudes en revicion
  lista_resto_protocolos:protocolrule [] = [];// lsita de solicitudes aprovadas

  lista_protocolos: protocolrule[]=[
    {ID_protocolo:'1APPDe', nombre_protocolo:'Animalitos del bosque', edo_protocolo: null,fecha:'05-06-2025'},
    {ID_protocolo:'1JKLP', nombre_protocolo:'Animalitos del bosque2', edo_protocolo: 'A',fecha:'05-06-2025'},
    {ID_protocolo:'1JKLP', nombre_protocolo:'Animalitos del bosque3', edo_protocolo: 'A/R',fecha:'05-06-2025'},
    {ID_protocolo:'1JKLP', nombre_protocolo:'Animalitos del bosque4', edo_protocolo: 'NA',fecha:'05-06-2025'}
  ];
  
  constructor(){
    this.clasificarprotocolos();
  }

  clasificarprotocolos(){
    for (let protocolo of this.lista_protocolos) {
      if(protocolo.edo_protocolo===null){
        this.lista_protocolo_revicion.push({ ...protocolo});
      }else{
        this.lista_resto_protocolos.push({ ...protocolo});
      }
    }
  }
}

/**

export class AdministracionSolicitudesComponent {
  
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
 */