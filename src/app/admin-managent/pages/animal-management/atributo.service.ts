import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

//---------------interfaces-------------------------
export interface especierules{
    ID_registro_especie:number,  
    nombre_especie:string,
    descripcion_especie:string, 
    disponibilidad_especie:boolean
}

export interface ceparules{
    ID_registro_cepa:number,
    nombre_cepa:string,   
    descripcion_cepa:string,  
    disponibilidad_cepa:boolean,
    ID_registro_especie:string
}

export interface sexorules{
    ID_registro_sexo:number, 
    nombre_sexo:string,  
    disponibilidad_sexo:boolean,
	ID_registro_cepa:number
}

export interface edadopesorules{
    ID_registro_edadopeso:number, 
    nombre_edadopeso:string,   
    descripcion_edadopeso:string,  
    disponibilidad_edadopeso:boolean, 
	ID_registro_sexo:number
}
//-------------------------------------------------

@Injectable({
  providedIn: 'root'  // ✅ Esto registra el servicio automáticamente
})


export class AnimalService {
  private http = inject(HttpClient);
  private apiUrlespecie = 'http://localhost:3000/api/A-especie';
  private apiUrlcepa = 'http://localhost:3000/api/A-cepa';
  private apiUrlsexo = 'http://localhost:3000/api/A-sexo';
  private apiUrledadopeso = 'http://localhost:3000/api/A-edadopeso';
 // ----------------------funciones especie------------------
  getespecie(): Observable<especierules[]> {
    return this.http.get<especierules[]>(this.apiUrlespecie);
  }

  crearespecieback(especie: especierules): Observable<any> {
    return this.http.post(this.apiUrlespecie, especie);
  }
//------------------------------------------------------------
// ----------------------funciones cepa------------------
  getcepa(): Observable<ceparules[]> {
    return this.http.get<ceparules[]>(this.apiUrlcepa);
  }

  crearcepaback(cepa: ceparules): Observable<any> {
    return this.http.post(this.apiUrlcepa, cepa);
  }
//------------------------------------------------------------
// ----------------------funciones sexo------------------
  getsexo(): Observable<sexorules[]> {
    return this.http.get<sexorules[]>(this.apiUrlsexo);
  }

  
  crearsexoback(sexo: sexorules): Observable<any> {
    return this.http.post(this.apiUrlsexo, sexo);
  }
//------------------------------------------------------------
// ----------------------funciones edadopeso------------------
  getedadopeso(): Observable<edadopesorules[]> {
    return this.http.get<edadopesorules[]>(this.apiUrledadopeso);
  }

  
  crearedadopesoback(edadopeso: edadopesorules): Observable<any> {
    return this.http.post(this.apiUrledadopeso, edadopeso);
  }
//------------------------------------------------------------
}