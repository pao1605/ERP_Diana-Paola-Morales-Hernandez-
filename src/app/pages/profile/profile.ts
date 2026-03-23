import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule,
    FormsModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {

  private auth = inject(AuthService);

  usuario: string = '';
  nombreCompleto: string = '';
  email: string = '';
  direccion: string = '';
  edad: number = 0;
  telefono: string = '';
  rol: string = '';

  displayModal: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {

    const user = this.auth.getUser();

    if (user) {
      this.usuario = user.username;
      this.nombreCompleto = user.nombre;
      this.email = user.email;
      this.direccion = user.direccion;
      this.telefono = user.telefono;
      this.edad = user.edad;
      this.rol = user.rol;
    }

  }

  abrirModal() {
    this.displayModal = true;
  }

  guardarCambios() {
    this.displayModal = false;
    console.log('Datos actualizados correctamente');
  }

  eliminarPerfil() {

    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {

      this.auth.logout();

      this.router.navigate(['/login']);

    }

  }

}