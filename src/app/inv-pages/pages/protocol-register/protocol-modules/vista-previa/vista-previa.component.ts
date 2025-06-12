import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-previa',
  imports: [CommonModule],
  templateUrl: './vista-previa.component.html'
})
export class VistaPreviaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  protocoloId!: number;
  vistaPrevia: any = null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.protocoloId = +params['id'];
      this.cargarVistaPrevia();
    });
  }

  cargarVistaPrevia() {
    this.http.get(`http://localhost:3000/api/vista-previa/${this.protocoloId}`).subscribe({
      next: (data) => this.vistaPrevia = data,
      error: (err) => console.error('Error al cargar vista previa:', err)
    });
  }
}
