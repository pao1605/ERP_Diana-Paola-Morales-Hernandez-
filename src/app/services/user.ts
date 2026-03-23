import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuarios: User[] = [

    {
      id: 1,
      nombre: 'Pao',
      email: 'pao@gmail.com',
      permisos: [
        'groups_view','groups_edit','groups_delete','groups_add',
        'user_view','user_edit','user_delete','user_add',
        'ticket_view','ticket_edit','ticket_delete','ticket_add'
      ]
    },

    {
      id: 2,
      nombre: 'Gael',
      email: 'gael@email.com',
      permisos: [
        'groups_view',
        'ticket_view',
        'ticket_add',
        'ticket_edit'
      ]
    }

  ];

  private usuarioActual: User | null = null;

  obtenerUsuarios(): User[] {
    return [...this.usuarios];
  }

  agregarUsuario(user: User) {
    this.usuarios.push(user);
  }

  actualizarUsuario(user: User) {

    const index = this.usuarios.findIndex(
      u => u.id === user.id
    );

    if (index !== -1) {
      this.usuarios[index] = user;
    }

  }

  eliminarUsuario(id: number) {

    this.usuarios = this.usuarios.filter(
      u => u.id !== id
    );

  }

  /* NUEVO */

  setUsuarioActual(user: User) {
    this.usuarioActual = user;
  }

  getUsuarioActual(): User | null {
    return this.usuarioActual;
  }

}