export interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'Pendiente' | 'En proceso' | 'Revisión' | 'Finalizado';
  prioridad: 'Alta' | 'Media' | 'Baja';
  fechaCreacion: Date;
  fechaLimite: Date;
  asignadoA: string; // ID o Nombre del usuario
  grupoId: number;   // Relación con el grupo
}