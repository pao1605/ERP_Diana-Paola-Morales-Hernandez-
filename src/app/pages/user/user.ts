import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; // <--- IMPORTANTE: Esto quita el error de p-button

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ButtonModule // <--- Agregado a los imports
  ],
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent {
  
  usuario: string = 'Pao';
  nombreCompleto: string = 'Diana Paola Morales';
  email: string = 'pao@gmail.com';
  direccion: string = 'Calle Falsa 123, Ciudad';
  edad: number = 20;
  telefono: string = '1234567890';
  rol: string = 'Administrador';

  
  editarPerfil() {
    console.log('Editando perfil de:', this.nombreCompleto);
  }
}