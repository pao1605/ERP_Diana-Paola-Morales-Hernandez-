import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupService {
  // Se añade 'as any[]' para que TypeScript permita el .push() de cualquier objeto
  private groups: any[] = [
    { 
      id: 1, 
      name: 'Frontend Team', 
      members: [] as any[], 
      tickets: [] as any[] 
    }
  ];

  getGroups() { 
    return of(this.groups); 
  }

  addMemberToGroup(groupId: number, member: any) {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
        group.members.push(member); // Esto ya no dará error de tipo 'never'
    }
  }
}