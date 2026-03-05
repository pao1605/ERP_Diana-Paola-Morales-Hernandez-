import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ButtonModule,
    DialogModule,
    FormsModule
  ],
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent {
  
  usuario: string = 'Pao';
  nombreCompleto: string = 'Diana Paola Morales';
  email: string = 'pao@gmail.com';
  direccion: string = 'AV Real del marques';
  edad: number = 20;
  telefono: string = '4421230996';
  rol: string = 'Administrador';

  displayModal: boolean = false;

  constructor(private router: Router) {} 

  abrirModal() {
    this.displayModal = true;
  }

  guardarCambios() {
    this.displayModal = false;
    console.log('Datos actualizados correctamente');
  }

  
  eliminarPerfil() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      
      this.usuario = '';
      this.nombreCompleto = '';
      this.email = '';
      
      console.log('Perfil eliminado');
      
      
      this.router.navigate(['/login']);
    }
  }
}