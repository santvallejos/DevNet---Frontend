import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule]  // Agrega CommonModule aquí para habilitar *ngIf
})
export class HeaderComponent {
  username: string = 'Nombre de Usuario'; // Cambia esto por el nombre del usuario
  dropdownVisible: boolean = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout() {
    // Lógica para cerrar sesión, como limpiar tokens, etc.
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }
}
