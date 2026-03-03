import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  
  appVersion: string = 'v1.0.0';

  ngOnInit() {
    this.items = [
      { 
        label: 'Home', 
        icon: 'pi pi-home', 
        routerLink: '/home' 
      },
      { 
        label: 'Grupos', 
        icon: 'pi pi-users', 
        routerLink: '/group' 
      },
      { 
        label: 'Usuarios', 
        icon: 'pi pi-user', 
        routerLink: '/user' 
      },
      { 
        separator: true 
      },
      { 
        label: 'Salir', 
        icon: 'pi pi-sign-out', 
        routerLink: '/login' 
      }
    ];
  }
}