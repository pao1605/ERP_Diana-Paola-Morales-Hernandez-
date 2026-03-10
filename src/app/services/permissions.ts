import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  // Estado interno privado (solo este servicio puede modificarlo)
  private perms = signal<string[]>([]);

  // Exponemos la señal como de solo lectura para que los componentes la observen
  permissionsSignal = this.perms.asReadonly();

  // Función para actualizar los permisos (usada en el Login)
  setPermissions(permissions: string[]) {
    this.perms.set(permissions);
  }

  // Método que la directiva o los componentes pueden usar para verificar un permiso
  hasPermission(permission: string): boolean {
    return this.perms().includes(permission);
  }
}