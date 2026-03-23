export interface Ticket {

  id?: number;

  titulo: string;

  descripcion: string;

  estado: 'Pendiente' | 'En progreso' | 'Revisión' | 'Finalizado';

  prioridad: 'Alta' | 'Media' | 'Baja';

  fechaCreacion: Date;

  fechaLimite: Date;

  asignadoA: string;

  grupoId?: number;

  comentarios?: string;

  historial?: string;

}