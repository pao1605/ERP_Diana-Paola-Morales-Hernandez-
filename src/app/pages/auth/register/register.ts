
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,          
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.html'
})
export class RegisterComponent {

  registerForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private message: MessageService
  ) {
    this.registerForm = this.fb.group({
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]]
    });
  }

  register() {

    if (this.registerForm.invalid) {
      this.message.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Completa todos los campos correctamente'
      });
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Las contraseñas no coinciden'
      });
      return;
    }

    this.message.add({
      severity: 'success',
      summary: 'Registro exitoso',
      detail: 'Usuario registrado correctamente'
    });
  }
}

