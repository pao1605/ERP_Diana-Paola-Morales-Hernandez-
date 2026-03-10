import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: Ticket[] = [
    {
      id: 1,
      titulo: 'Error login',
      descripcion: 'No permite iniciar sesión',
      estado: 'Pendiente',
      prioridad: 'Alta',
      fechaCreacion: new Date(),
      fechaLimite: new Date(),
      asignadoA: 'Juan',
      grupoId: 1
    }
  ];

  private ticketsSubject = new BehaviorSubject<Ticket[]>(this.tickets);

  tickets$ = this.ticketsSubject.asObservable();


  obtenerTickets(): Ticket[] {
    return this.tickets;
  }

  agregarTicket(ticket: Ticket) {

    this.tickets.push(ticket);

    this.ticketsSubject.next(this.tickets);

  }

}