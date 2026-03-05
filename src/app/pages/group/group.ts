import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea'; 

interface Grupo {
  id?: number;
  nombre: string;
  nivel: string;
  autor: string;
  integrantes: number;
  tickets: number;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    CardModule, 
    TableModule, 
    ButtonModule, 
    TagModule, 
    DialogModule,
    InputTextModule,
    TextareaModule
  ],
  templateUrl: './group.html',
  styleUrls: ['./group.scss']
})
export class GroupComponent implements OnInit {
  totalN: number = 0; 
  mostrarDialogo: boolean = false; 
  grupoSeleccionado: any = {}; 

 
  grupos: Grupo[] = [
    { id: 1, nombre: 'Desarrolladores Alpha', nivel: 'Avanzado', autor: 'Diana Morales', integrantes: 12, tickets: 4, descripcion: 'Equipo de desarrollo senior', estado: 'Activo' },
    { id: 2, nombre: 'Diseño UI', nivel: 'Intermedio', autor: 'Pao Morales', integrantes: 6, tickets: 2, descripcion: 'Especialistas en interfaces', estado: 'Inactivo' }
  ];

  ngOnInit() {
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.totalN = this.grupos.length; 
  }

  

  abrirNuevo() {
    this.grupoSeleccionado = { nombre: '', nivel: '', autor: '', integrantes: 0, tickets: 0, descripcion: '', estado: 'Activo' };
    this.mostrarDialogo = true;
  }

  editarGrupo(grupo: Grupo) {
    this.grupoSeleccionado = { ...grupo };
    this.mostrarDialogo = true;
  }

  eliminarGrupo(id: number) {
    
    if (confirm('¿Estás seguro de que deseas eliminar este grupo?')) {
      this.grupos = this.grupos.filter(g => g.id !== id);
      this.actualizarTotal();
    }
  }

  guardarGrupo() {
    if (this.grupoSeleccionado.id) {
      
      const index = this.grupos.findIndex(g => g.id === this.grupoSeleccionado.id);
      this.grupos[index] = this.grupoSeleccionado;
    } else {
      
      this.grupoSeleccionado.id = Date.now();
      this.grupos.push(this.grupoSeleccionado);
    }
    this.mostrarDialogo = false;
    this.actualizarTotal();
  }

  
  getSeverity(estado: string): "success" | "info" | "warn" | "danger" | "secondary" | "contrast" | null | undefined {
    switch (estado) {
      case 'Activo': return 'success';
      case 'Inactivo': return 'info';
    
      default: return 'warn';
    }
  }
}