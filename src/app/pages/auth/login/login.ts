import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
  templateUrl: './login.html'
})
export class LoginComponent {

  loginForm!: FormGroup;

  
  private USER = 'Pao';
  private PASS = 'Pao@162005';

  constructor(
    private fb: FormBuilder,
    private message: MessageService
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

    
    if (user === this.USER && password === this.PASS) {
      this.message.add({
        severity: 'success',
        summary: 'Login correcto',
        detail: 'Bienvenido al sistema'
      });
    } 
   
    else {
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Usuario o contraseña incorrectos'
      });
    }
  }
}