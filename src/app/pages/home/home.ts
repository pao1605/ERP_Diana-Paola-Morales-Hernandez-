import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';

import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket';
import { AuthService } from '../../services/auth';
import { PermissionsService } from '../../services/permissions';

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

  constructor(
    private ticketService: TicketService,
    private auth: AuthService,
    private perms: PermissionsService
  ) {}

  ngOnInit(): void {

    this.ticketService.tickets$.subscribe(tickets => {

      const user = this.auth.getUser();

      /* ========================= */
      /* FILTRAR POR PERMISOS */
      /* ========================= */

      if (this.perms.hasPermission('ticket_delete')) {

        // SUPER USUARIO (Pao) VE TODOS
        this.tickets = tickets;

      } else {

        // USUARIO NORMAL SOLO LOS SUYOS
        this.tickets = tickets.filter(
          t => t.asignadoA?.toLowerCase() === user?.username?.toLowerCase()
        );

      }

      this.calcularKPIs();
      this.generarGrafica();

    });

  }

  calcularKPIs() {

   this.totalTickets = this.tickets.length;

    this.pendientes = this.tickets.filter(
    t => t.estado?.toLowerCase() === 'pendiente'
    ).length;

    this.enProgreso = this.tickets.filter(
    t => t.estado?.toLowerCase() === 'en progreso'
    ).length;

    this.revision = this.tickets.filter(
    t => t.estado?.toLowerCase() === 'revisión'
   ).length;

    this.finalizados = this.tickets.filter(
    t => t.estado?.toLowerCase() === 'finalizado'
    ).length;

  }
  generarGrafica() {

    this.chartData = {
      labels: ['Pendiente','En progreso','Revisión','Finalizado'],
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