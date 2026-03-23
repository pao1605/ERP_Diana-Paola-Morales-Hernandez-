import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';

import { UserService } from '../../services/user';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CheckboxModule,
    TagModule
  ],
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent implements OnInit {

  usuarios: User[] = [];

  mostrarDialogo = false;

  esEdicion = false;

  permisosDisponibles = [
    'groups_view',
    'groups_add',
    'groups_edit',
    'groups_delete',
    'ticket_view',
    'ticket_add',
    'ticket_edit',
    'ticket_delete',
    'user_view',
    'user_add',
    'user_edit',
    'user_delete'
  ];

  usuarioSeleccionado: User = {
    id: 0,
    nombre: '',
    email: '',
    permisos: []
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.usuarios = this.userService.obtenerUsuarios();

  }

  nuevoUsuario(){

    this.esEdicion = false;

    this.usuarioSeleccionado = {
      id: 0,
      nombre:'',
      email:'',
      permisos:[]
    };

    this.mostrarDialogo = true;

  }

  editarUsuario(user:User){

    this.esEdicion = true;

    this.usuarioSeleccionado = {...user};

    this.mostrarDialogo = true;

  }

  guardarUsuario(){

    if(this.esEdicion){

      this.userService.actualizarUsuario(this.usuarioSeleccionado);

    }else{

      this.usuarioSeleccionado.id = this.generarId();

      this.userService.agregarUsuario(this.usuarioSeleccionado);

    }

    this.usuarios = this.userService.obtenerUsuarios();

    this.mostrarDialogo = false;

  }

  eliminarUsuario(id:number){

    this.userService.eliminarUsuario(id);

    this.usuarios = this.userService.obtenerUsuarios();

  }

  generarId(){

    if(this.usuarios.length === 0) return 1;

    return Math.max(...this.usuarios.map(u => u.id)) + 1;

  }

}