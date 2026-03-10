import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';

import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    ChartModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})

export class HomeComponent implements OnInit {

  tickets: Ticket[] = [];

  totalTickets = 0;
  pendientes = 0;
  enProgreso = 0;
  revision = 0;
  finalizados = 0;

  chartData: any;
  chartOptions: any;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {

    /* Escuchar cambios de tickets */

    this.ticketService.tickets$.subscribe(tickets => {

      this.tickets = tickets;

      this.calcularKPIs();

      this.generarGrafica();

    });

  }

  /* ========================= */
  /* CALCULAR KPIs */
  /* ========================= */

  calcularKPIs() {

    this.totalTickets = this.tickets.length;

    this.pendientes = this.tickets.filter(
      t => t.estado === 'Pendiente'
    ).length;

    this.enProgreso = this.tickets.filter(
      t => t.estado === 'En proceso'
    ).length;

    this.revision = this.tickets.filter(
      t => t.estado === 'Revisión'
    ).length;

    this.finalizados = this.tickets.filter(
      t => t.estado === 'Finalizado'
    ).length;

  }

  /* ========================= */
  /* GENERAR GRAFICA */
  /* ========================= */

  generarGrafica() {

    this.chartData = {

      labels: [
        'Pendiente',
        'En proceso',
        'Revisión',
        'Finalizado'
      ],

      datasets: [
        {
          label: 'Tickets',

          data: [
            this.pendientes,
            this.enProgreso,
            this.revision,
            this.finalizados
          ],

          backgroundColor: [
            '#ffc107',
            '#17a2b8',
            '#6f42c1',
            '#28a745'
          ],

          hoverOffset: 4
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    };

  }

}