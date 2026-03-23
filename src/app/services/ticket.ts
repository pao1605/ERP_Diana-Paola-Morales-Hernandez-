import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: Ticket[] = [];

  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);

  tickets$ = this.ticketsSubject.asObservable();

  constructor() {

  const gruposGuardados = localStorage.getItem('grupos');

  if (gruposGuardados) {

    const grupos = JSON.parse(gruposGuardados);

    this.tickets = grupos.flatMap((g: any) => g.ticketsList || []);

  }

  this.ticketsSubject.next([...this.tickets]);

}

  obtenerTickets(): Ticket[] {
    return [...this.tickets];
  }

  agregarTicket(ticket: Ticket) {

    this.tickets.push(ticket);

    localStorage.setItem('tickets', JSON.stringify(this.tickets));

    this.ticketsSubject.next([...this.tickets]);

  }

  actualizarTicket(ticketActualizado: Ticket) {

    const index = this.tickets.findIndex(t => t.id === ticketActualizado.id);

    if (index !== -1) {

      this.tickets[index] = ticketActualizado;

      localStorage.setItem('tickets', JSON.stringify(this.tickets));

      this.ticketsSubject.next([...this.tickets]);

    }

  }


  eliminarTicket(id: number) {

   this.tickets = this.tickets.filter(
    t => t.id !== id
    );

   this.ticketsSubject.next([...this.tickets]);

  }

}