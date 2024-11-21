import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})

export class ForgotPasswordComponent {
  emailform!: FormGroup;
  messageSent: boolean = false; // Variable para mostrar el mensaje de confirmación

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.emailform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword(): void {
    if (this.emailform.valid) {
      console.log('Formulario válido, procesando...');
      console.log('Email ingresado:', this.emailform.get('email')?.value);
  
      // Muestra el mensaje de éxito
      this.toastr.success('¡Correo de recuperación enviado con éxito!');
  
      // Muestra el mensaje y redirige al login después de 2 segundos
      this.messageSent = true;
  
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirigir al login
      }, 2000);
    } else {
      console.log('Formulario inválido');
      // Muestra el mensaje de error si el formulario es inválido
      this.toastr.error('Por favor, ingresa un correo válido.');
    }
  }
  
}