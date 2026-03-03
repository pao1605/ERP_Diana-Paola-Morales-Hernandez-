import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; // Necesario para <p-card>

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './group.html',
  styleUrls: ['./group.scss']
}) // <--- AQUÍ FALTABA ESTE PARÉNTESIS Y LA LLAVE
export class GroupComponent {
  // Aquí definimos el "Total N" que pide la pizarra
  totalN: number = 20;
}