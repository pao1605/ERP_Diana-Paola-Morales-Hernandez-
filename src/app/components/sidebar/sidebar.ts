import { Component, inject, computed } from '@angular/core'; // Agregamos computed
import { Router } from '@angular/router';

import { MenuModule } from 'primeng/menu';
import { PermissionsService } from '../../services/permissions'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  private permsSvc = inject(PermissionsService);
  private router = inject(Router);

  appVersion: string = 'v1.0.0';

  // Usamos computed para que el menú se recalcule automáticamente cuando permissionsSignal cambie
  items = computed(() => {
    const currentPerms = this.permsSvc.permissionsSignal(); // Reactivo: observa cambios
    
    const menuConfig = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Grupos', icon: 'pi pi-users', routerLink: '/group', permission: 'groups_view' },
      { label: 'Usuarios', icon: 'pi pi-user', routerLink: '/user', permission: 'user_view' },
      { label: 'Perfil', icon: 'pi pi-id-card', routerLink: '/profile' },

      { separator: true },

      { 
        label: 'Salir', 
        icon: 'pi pi-sign-out', 
        command: () => this.logout() 
      }
    ];

    return menuConfig.filter(item => {
      if (!item.permission) return true;
      return currentPerms.includes(item.permission);
    });
  });

  logout() {
    this.permsSvc.setPermissions([]); 
    this.router.navigate(['/login']);
  }
}