import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { ListaUsuariosComponent } from '../users-management/get-info-users/lista-usuarios/lista-usuarios.component'
import {AddUsersComponent} from '../users-management/add-users/add-users.component';


@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [ CommonModule, FormsModule,ReactiveFormsModule,ListaUsuariosComponent,AddUsersComponent],
  templateUrl: './users-management.component.html',
})



export class UsersManagementComponent { 

}