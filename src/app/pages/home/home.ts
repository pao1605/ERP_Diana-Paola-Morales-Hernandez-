import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; // Importar para el botón del footer

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule], // Agregado ButtonModule
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {}