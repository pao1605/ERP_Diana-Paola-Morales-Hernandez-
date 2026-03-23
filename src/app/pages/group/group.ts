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
import { Ticket } from '../../models/ticket';
import { PermissionsService } from '../../services/permissions';
import { UserService } from '../../services/user';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

interface Miembro {
  nombre: string;
  email: string;
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
    TooltipModule,
    DragDropModule,
  ],
  templateUrl: './group.html',
  styleUrls: ['./group.scss']
})
export class GroupComponent implements OnInit {
  constructor(
    private ticketService: TicketService,
    public permsSvc: PermissionsService,
    private userService: UserService
  ) {}

  vistaActual: 'grupos' | 'tickets' = 'grupos';
  vistaTickets: 'kanban' | 'tabla' = 'kanban';
  filtroTickets: string = 'todos';
  usuarioActual: string = '';

  mostrarDialogo = false;
  mostrarDialogoTicket = false;

  esNuevoGrupo = false;
  mostrarSeccionMiembros = false;

  filtroEstado = 'todos';
  mostrarDetalleTicket = false;
  ticketDetalle: Ticket | null = null;
  ticketOriginal: Ticket | null = null;

  estadosKanban = [
    'Pendiente',
    'En progreso',
    'Revisión',
    'Finalizado'
  ];

  columnasKanbanIds = [
    'col-pendiente',
    'col-enprogreso',
    'col-revision',
    'col-finalizado'
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
        { nombre: 'Gael', email: 'gael@email.com' }
      ],
      ticketsList: [
        {
          id: 1,
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

  ngOnInit() {
    const gruposGuardados = localStorage.getItem('grupos');

    if (gruposGuardados) {
      const gruposParseados: Grupo[] = JSON.parse(gruposGuardados) || [];

      this.grupos = gruposParseados.map(grupo => ({
        ...grupo,
        miembros: grupo.miembros || [],
        ticketsList: (grupo.ticketsList || []).map(ticket => ({
          ...ticket,
          fechaCreacion: new Date(ticket.fechaCreacion),
          fechaLimite: new Date(ticket.fechaLimite)
        })),
        integrantes: grupo.miembros?.length || 0,
        tickets: grupo.ticketsList?.length || 0
      }));
    }

    const user = this.userService.getUsuarioActual();
    if (user) {
      this.usuarioActual = user.nombre;
    }
  }

  gestionarMiembros(grupo: Grupo) {
    this.vistaActual = 'grupos';
    this.grupoSeleccionado = { ...grupo };
    this.mostrarSeccionMiembros = true;
    this.mostrarDetalleTicket = false;
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

    if (ultimo && (!ultimo.nombre || !ultimo.email)) {
      alert('Completa el miembro actual antes de agregar otro');
      return;
    }

    this.grupoSeleccionado.miembros.push({
      nombre: '',
      email: ''
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

    const index = this.grupos.findIndex(
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
      const index = this.grupos.findIndex(
        g => g.id === this.grupoSeleccionado?.id
      );

      if (index !== -1) {
        this.grupos[index] = { ...this.grupoSeleccionado };
      }
    }

    localStorage.setItem('grupos', JSON.stringify(this.grupos));
    this.mostrarDialogo = false;
  }

  mostrarGrupos() {
    this.vistaActual = 'grupos';
    this.mostrarSeccionMiembros = false;
    this.mostrarDetalleTicket = false;
  }

  mostrarTickets() {
    this.vistaActual = 'tickets';
    this.vistaTickets = 'kanban';
  }

  cambiarVistaTickets(vista: 'kanban' | 'tabla') {
    this.vistaTickets = vista;
  }

  esVistaTabla(): boolean {
    return this.vistaTickets === 'tabla';
  }

  esVistaKanban(): boolean {
    return this.vistaTickets === 'kanban';
  }

  eliminarGrupo(id: number) {
    this.grupos = this.grupos.filter(g => g.id !== id);

    if (this.grupoSeleccionado?.id === id) {
      this.mostrarSeccionMiembros = false;
      this.grupoSeleccionado = null;
    }

    localStorage.setItem('grupos', JSON.stringify(this.grupos));
  }

  abrirFormularioTicket(grupo: Grupo) {
    this.grupoSeleccionado = grupo;
    this.vistaActual = 'tickets';
    this.vistaTickets = 'kanban';

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

    const nuevoTicket: Ticket = {
      ...this.ticketSeleccionado,
      id: Date.now(),
      grupoId: this.grupoSeleccionado.id!,
      fechaCreacion: new Date()
    };

    nuevoTicket.historial =
      'Ticket creado el ' + new Date().toLocaleDateString();

    this.grupoSeleccionado.ticketsList.push(nuevoTicket);

    this.ticketService.agregarTicket(nuevoTicket);

    this.actualizarContadores();
    localStorage.setItem('grupos', JSON.stringify(this.grupos));

    this.mostrarDialogoTicket = false;
  }

  obtenerTicketsPorEstado(estado: string): Ticket[] {
    let tickets = this.obtenerTicketsGrupo().filter(
      t => t.estado === estado
    );

    if (this.filtroTickets === 'mis') {
      tickets = tickets.filter(
        t => t.asignadoA === this.usuarioActual
      );
    }

    if (this.filtroTickets === 'sin_asignar') {
      tickets = tickets.filter(
        t => !t.asignadoA
      );
    }

    if (this.filtroTickets === 'alta') {
      tickets = tickets.filter(
        t => t.prioridad === 'Alta'
      );
    }

    return tickets;
  }

  obtenerTicketsFiltradosTabla(): Ticket[] {
    let tickets = this.obtenerTicketsGrupo();

    if (this.filtroTickets === 'mis') {
      tickets = tickets.filter(
        t => t.asignadoA === this.usuarioActual
      );
    }

    if (this.filtroTickets === 'sin_asignar') {
      tickets = tickets.filter(
        t => !t.asignadoA
      );
    }

    if (this.filtroTickets === 'alta') {
      tickets = tickets.filter(
        t => t.prioridad === 'Alta'
      );
    }

    return tickets;
  }

  moverTicket(
    ticket: Ticket,
    nuevoEstado: 'Pendiente' | 'En progreso' | 'Revisión' | 'Finalizado'
  ) {
    ticket.estado = nuevoEstado;

    ticket.historial =
      (ticket.historial || '') +
      '\nMovido a ' +
      nuevoEstado +
      ' el ' +
      new Date().toLocaleDateString();

    localStorage.setItem('grupos', JSON.stringify(this.grupos));
    this.ticketService.actualizarTicket(ticket);
  }

  verTicketsGrupo(grupo: Grupo) {
    this.grupoSeleccionado = grupo;
    this.vistaActual = 'tickets';
    this.vistaTickets = 'kanban';
    this.filtroTickets = 'todos';
    this.mostrarSeccionMiembros = false;
    this.mostrarDialogo = false;
    this.mostrarDialogoTicket = false;
  }

  abrirDetalleTicket(ticket: Ticket) {
    this.ticketOriginal = ticket;
    this.ticketDetalle = { ...ticket };
    this.mostrarDetalleTicket = true;
  }

  guardarCambiosTicket() {
    if (!this.ticketDetalle || !this.ticketOriginal) return;

    this.ticketDetalle.historial =
      (this.ticketDetalle.historial || '') +
      '\nEditado el ' +
      new Date().toLocaleString();

    Object.assign(this.ticketOriginal, this.ticketDetalle);

    this.ticketService.actualizarTicket(this.ticketDetalle);
    localStorage.setItem('grupos', JSON.stringify(this.grupos));

    this.mostrarDetalleTicket = false;
  }

  eliminarTicket(ticket: Ticket) {
    if (!this.grupoSeleccionado) return;

    this.grupoSeleccionado.ticketsList =
      this.grupoSeleccionado.ticketsList.filter(
        t => t.id !== ticket.id
      );

    this.ticketService.eliminarTicket(ticket.id!);

    this.actualizarContadores();
    localStorage.setItem('grupos', JSON.stringify(this.grupos));
  }

  obtenerTicketsGrupo(): Ticket[] {
    if (!this.grupoSeleccionado?.ticketsList) return [];
    return this.grupoSeleccionado.ticketsList;
  }

    drop(
    event: CdkDragDrop<Ticket[]>,
    nuevoEstado: 'Pendiente' | 'En progreso' | 'Revisión' | 'Finalizado'
  ) {
    if (!this.grupoSeleccionado) return;

    const ticket = event.item.data as Ticket;
    if (!ticket) return;

    if (ticket.estado === nuevoEstado) return;

    ticket.estado = nuevoEstado;

    ticket.historial =
      (ticket.historial || '') +
      '\nMovido a ' +
      nuevoEstado +
      ' el ' +
      new Date().toLocaleDateString();

    // fuerza refresco visual del arreglo base
    this.grupoSeleccionado.ticketsList = [...this.grupoSeleccionado.ticketsList];

    // también actualiza el grupo dentro del arreglo principal
    const index = this.grupos.findIndex(g => g.id === this.grupoSeleccionado?.id);
    if (index !== -1) {
      this.grupos[index] = {
        ...this.grupoSeleccionado,
        ticketsList: [...this.grupoSeleccionado.ticketsList]
      };
    }

    this.ticketService.actualizarTicket(ticket);
    localStorage.setItem('grupos', JSON.stringify(this.grupos));
  }
}