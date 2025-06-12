import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-underreview-protocols',
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './underreview-protocols.component.html',
})
export class UnderreviewProtocolsComponent implements OnInit  {

  private http = inject(HttpClient);

  protocolos: any[] = [];
  cargando = true;

  ngOnInit(): void {
    this.http.get<any[]>('/api/protocolo/en-revision').subscribe({
      next: (data) => {
        this.protocolos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener protocolos en revisión:', err);
        this.cargando = false;
      }
    });
  }

 }
