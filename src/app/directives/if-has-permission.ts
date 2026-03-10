import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { PermissionsService } from '../services/permissions';

@Directive({
  selector: '[ifHasPermission]',
  standalone: true // Importante para usarla fácilmente en tus páginas
})
export class IfHasPermissionDirective {
  private permsSvc = inject(PermissionsService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  @Input('ifHasPermission') set permission(val: string) {
    // Si el usuario tiene el permiso, renderizamos el contenido
    if (this.permsSvc.hasPermission(val)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Si no, borramos el elemento del DOM por completo
      this.viewContainer.clear();
    }
  }
}