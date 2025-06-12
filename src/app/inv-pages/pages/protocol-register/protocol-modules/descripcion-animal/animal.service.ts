import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface animalesrules{
    linea:string,
    ID_registro_especie:number,
    nombre_especie:string,
    ID_registro_cepa:number,
    nombre_cepa:string,
	  ID_registro_sexo:number,
    nombre_sexo:string,
    ID_registro_edadopeso:number,
    nombre_edadopeso:string,
    disponibilidad_animal: boolean,   
}

@Injectable({
  providedIn: 'root'  // ✅ Esto registra el servicio automáticamente
})

export class AnimalService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/animales';

  getanimal(): Observable<animalesrules[]> {
    return this.http.get<animalesrules[]>(this.apiUrl);
  }

  
  creardepartamentoback(animal: animalesrules): Observable<any> {
    return this.http.post(this.apiUrl, animal);
  }
}