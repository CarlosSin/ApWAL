import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-library-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './library-page.component.html',
})
export class LibraryPageComponent implements OnInit {
  recursos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarRecursos();
  }

  cargarRecursos(): void {
    this.http.get<any[]>('http://localhost:3000/api/recursos')
      .subscribe({
        next: data => {
          this.recursos = data.filter(recurso => recurso.ruta); // Asegura que tenga archivo
        },
        error: err => console.error('Error al cargar recursos:', err)
      });
  }

  obtenerURL(ruta: string): string {
    return `http://localhost:3000${ruta}`;
  }
}
