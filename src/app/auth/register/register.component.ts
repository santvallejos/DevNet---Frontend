import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Aquí iría la lógica para registrar al usuario
    // Por ejemplo, llamar a un servicio de autenticación
    console.log('Usuario registrado:', this.user);
    // Redireccionar al usuario a la página de inicio o a otra página
    this.router.navigate(['/home']);
  }
}

