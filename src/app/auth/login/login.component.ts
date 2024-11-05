import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule], // Importa CommonModule aquí
})
export class LoginComponent {
  isLoggedIn = false; // Aquí puedes manejar tu lógica de autenticación
}


