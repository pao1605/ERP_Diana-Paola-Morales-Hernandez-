import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PermissionsService } from './services/permissions'; // Ajusta la ruta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  private permsSvc = inject(PermissionsService);

  ngOnInit() {
    // Al cargar la app, revisamos si hay una sesión guardada en el navegador
    const savedPerms = localStorage.getItem('user_perms');
    
    if (savedPerms) {
      // Si existen, se los devolvemos al servicio automáticamente
      this.permsSvc.setPermissions(JSON.parse(savedPerms));
    }
  }
}