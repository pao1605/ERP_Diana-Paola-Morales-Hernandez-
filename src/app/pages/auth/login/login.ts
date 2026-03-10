import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { PermissionsService } from '../../../services/permissions';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  private permsSvc = inject(PermissionsService);

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: MessageService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login() {

    if (this.loginForm.invalid) {
      this.message.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Debes completar todos los campos'
      });
      return;
    }

    const { user, password } = this.loginForm.value;

    /* =======================
       SUPER ADMIN
    ======================= */

    if (user === 'Pao' && password === 'Pao@162005') {

      const permisosSuperAdmin = [
        'groups_view','groups_edit','groups_delete','groups_add',
        'user_view','user_edit','user_delete','user_add',
        'ticket_view','ticket_edit','ticket_delete','ticket_add'
      ];

      this.permsSvc.setPermissions(permisosSuperAdmin);

      this.loginSuccess('Bienvenido Super Admin');

      return;
    }

    /* =======================
       USUARIO NORMAL
    ======================= */

    if (user === 'gael' && password === '1234') {

      const permisosUser = [
        'groups_view',
        'ticket_view',
        'ticket_add',
        'ticket_edit'
      ];

      this.permsSvc.setPermissions(permisosUser);

      this.loginSuccess('Bienvenido Usuario');

      return;
    }

    /* =======================
       USUARIO SOLO LECTURA
    ======================= */

    if (user === 'viewer' && password === '1234') {

      const permisosViewer = [
        'groups_view',
        'ticket_view'
      ];

      this.permsSvc.setPermissions(permisosViewer);

      this.loginSuccess('Bienvenido Usuario Viewer');

      return;
    }

    /* =======================
       ERROR LOGIN
    ======================= */

    this.message.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Usuario o contraseña incorrectos'
    });

  }


  /* =======================
     LOGIN SUCCESS
  ======================= */

  private loginSuccess(msg: string) {

    this.message.add({
      severity: 'success',
      summary: 'Login correcto',
      detail: msg
    });

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 800);

  }

}