import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

interface Miembro {
  nombre: string;
  email: string;
  rol: string;
}

interface Ticket {
  titulo: string;
  descripcion: string;
  estado: string;
  asignadoA: string;
  prioridad: string;
  fechaCreacion: Date;
  fechaLimite: Date;
  comentarios: string;
  historial: string;
}

interface Grupo {
  id?: number;
  nombre: string;
  nivel: string;
  autor: string;
  integrantes: number;
  tickets: number;
  descripcion: string;
  estado: string;
  miembros: Miembro[];
  ticketsList: Ticket[];
}

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    TagModule,
    CardModule,
    InputTextModule,
    TooltipModule
  ],
  templateUrl: './group.html',
  styleUrls: ['./group.scss']
})
export class GroupComponent implements OnInit {
  constructor(private ticketService: TicketService) {}

  vistaActual: 'grupos' | 'tickets' = 'grupos';

  mostrarDialogo = false;
  mostrarDialogoTicket = false;

  esNuevoGrupo = false;
  mostrarSeccionMiembros = false;
 
  filtroEstado = 'todos';
  

  estadosKanban = [
    'Pendiente',
    'En progreso',
    'Revisión',
    'Finalizado'
  ];

  grupoSeleccionado: Grupo | null = null;

  ticketSeleccionado: Ticket = {
    titulo: '',
    descripcion: '',
    estado: 'Pendiente',
    asignadoA: '',
    prioridad: 'Media',
    fechaCreacion: new Date(),
    fechaLimite: new Date(),
    comentarios: '',
    historial: ''
  };

  grupos: Grupo[] = [
    {
      id: 1,
      nombre: 'Frontend Team',
      nivel: 'Avanzado',
      autor: 'Gael',
      integrantes: 1,
      tickets: 1,
      descripcion: 'Equipo visual',
      estado: 'Activo',
      miembros: [
        { nombre: 'Gael', email: 'gael@email.com', rol: 'Líder' }
      ],
      ticketsList: [
        {
          titulo: 'Error login',
          descripcion: 'No carga el formulario',
          estado: 'Pendiente',
          asignadoA: 'Gael',
          prioridad: 'Alta',
          fechaCreacion: new Date(),
          fechaLimite: new Date(),
          comentarios: '',
          historial: ''
        }
      ]
    }
    
    
  ];

  ngOnInit() {}

  gestionarMiembros(grupo: Grupo) {
    this.grupoSeleccionado = { ...grupo };
    this.mostrarSeccionMiembros = true;
  }

  editarGrupo(grupo?: Grupo) {

    if (grupo) {

      this.esNuevoGrupo = false;
      this.grupoSeleccionado = { ...grupo };

    } else {

      this.esNuevoGrupo = true;

      this.grupoSeleccionado = {
        nombre: '',
        nivel: '',
        autor: '',
        integrantes: 0,
        tickets: 0,
        descripcion: '',
        estado: 'Activo',
        miembros: [],
        ticketsList: []
      };

    }

    this.mostrarDialogo = true;

  }

  agregarMiembro() {

    if (!this.grupoSeleccionado) return;

    const ultimo =
      this.grupoSeleccionado.miembros[
        this.grupoSeleccionado.miembros.length - 1
      ];

    if (ultimo && (!ultimo.nombre || !ultimo.email || !ultimo.rol)) {
      alert('Completa el miembro actual antes de agregar otro');
      return;
    }

    this.grupoSeleccionado.miembros.push({
      nombre: '',
      email: '',
      rol: ''
    });

    this.actualizarContadores();

  }

  eliminarMiembro(index: number) {

    this.grupoSeleccionado?.miembros.splice(index, 1);

    this.actualizarContadores();

  }

  actualizarContadores() {

    if (!this.grupoSeleccionado) return;

    this.grupoSeleccionado.integrantes =
      this.grupoSeleccionado.miembros.length;

    this.grupoSeleccionado.tickets =
      this.grupoSeleccionado.ticketsList.length;

    const index =
      this.grupos.findIndex(
        g => g.id === this.grupoSeleccionado?.id
      );

    if (index !== -1) {

      this.grupos[index].integrantes =
        this.grupoSeleccionado.integrantes;

      this.grupos[index].tickets =
        this.grupoSeleccionado.tickets;

    }

  }

  guardarGrupo() {

    if (!this.grupoSeleccionado) return;

    if (this.esNuevoGrupo) {

      this.grupoSeleccionado.id = Date.now();

      this.grupos = [
        ...this.grupos,
        this.grupoSeleccionado
      ];

    } else {

      const index =
        this.grupos.findIndex(
          g => g.id === this.grupoSeleccionado?.id
        );

      if (index !== -1) {
        this.grupos[index] = { ...this.grupoSeleccionado };
      }

    }

    this.mostrarDialogo = false;

  }

  eliminarGrupo(id: number) {

    this.grupos = this.grupos.filter(
      g => g.id !== id
    );

    if (this.grupoSeleccionado?.id === id) {
      this.mostrarSeccionMiembros = false;
    }

  }

  abrirFormularioTicket(grupo: Grupo) {

    this.grupoSeleccionado = grupo;

    this.ticketSeleccionado = {
      titulo: '',
      descripcion: '',
      estado: 'Pendiente',
      asignadoA: '',
      prioridad: 'Media',
      fechaCreacion: new Date(),
      fechaLimite: new Date(),
      comentarios: '',
      historial: ''
    };

    this.mostrarDialogoTicket = true;

  }

  guardarTicket() {

    if (!this.grupoSeleccionado) return;

    this.ticketSeleccionado.historial =
      'Ticket creado el ' +
      new Date().toLocaleDateString();

    this.grupoSeleccionado.ticketsList.push(
      this.ticketSeleccionado
    ); 
    

    this.actualizarContadores();

    this.mostrarDialogoTicket = false;

  }

  obtenerTicketsPorEstado(estado: string) {

    if (!this.grupoSeleccionado) return [];

    return this.grupoSeleccionado.ticketsList.filter(
      t => t.estado === estado
    );

  }

  moverTicket(ticket: Ticket, nuevoEstado: string) {

    ticket.estado = nuevoEstado;

    ticket.historial =
      ticket.historial +
      '\nMovido a ' +
      nuevoEstado +
      ' el ' +
      new Date().toLocaleDateString();

  }

  verTicketsGrupo(grupo: Grupo) {

   this.grupoSeleccionado = grupo;

   this.vistaActual = 'tickets';

  }

}