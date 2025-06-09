import { Component,inject, OnInit } from '@angular/core';
import { DepartamentService, departamentorules} from '../../department-management/department.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-get-info-department',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './get-info-department.component.html',
})
export class GetInfoDepartmentComponent implements OnInit { 

  private usuariosService = inject(DepartamentService);
  departamentdb: departamentorules[] = [];

  
  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(data => {
      console.log('Usuarios recibidos:', data);
      this.departamentdb = data;
    });

}
}


/** 



*/