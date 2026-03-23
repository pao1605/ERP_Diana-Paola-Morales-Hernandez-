import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { PermissionsService } from '../../../services/permissions';
import { AuthService } from '../../../services/auth';

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
  private authSvc = inject(AuthService);

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

    const user = this.loginForm.value.user?.toLowerCase();
    const password = this.loginForm.value.password;

    /* =======================
       SUPER ADMIN
    ======================= */

    if (user === 'pao' && password === 'Pao@162005') {

      const permisosSuperAdmin = [
        'groups_view','groups_edit','groups_delete','groups_add',
        'user_view','user_edit','user_delete','user_add',
        'ticket_view','ticket_edit','ticket_delete','ticket_add'
      ];

      this.permsSvc.setPermissions(permisosSuperAdmin);

      this.authSvc.login({
        username:'pao',
        nombre:'Diana Paola Morales',
        email:'pao@gmail.com',
        direccion:'AV Real del marques',
        telefono:'4421230996',
        edad:20,
        rol:'Super Admin'
      });

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

      this.authSvc.login({
        username:'gael',
        nombre:'Gael Martinez',
        email:'gael@email.com',
        direccion:'Querétaro',
        telefono:'4420000000',
        edad:21,
        rol:'Usuario'
      });

      this.loginSuccess('Bienvenido Usuario');
      return;
    }

    /* =======================
       VIEWER
    ======================= */

    if (user === 'viewer' && password === '1234') {

      const permisosViewer = [
        'groups_view',
        'ticket_view'
      ];

      this.permsSvc.setPermissions(permisosViewer);

      this.authSvc.login({
        username:'viewer',
        nombre:'Usuario Viewer',
        email:'viewer@email.com',
        direccion:'N/A',
        telefono:'N/A',
        edad:0,
        rol:'Viewer'
      });

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