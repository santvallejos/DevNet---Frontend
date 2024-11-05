import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string = 'Nombre de Usuario'; // Cambia esto por el nombre del usuario
  dropdownVisible: boolean = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, etc.
    this.router.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión
  }
}




