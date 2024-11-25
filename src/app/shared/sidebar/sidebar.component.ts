// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowbiteService } from '../../services/flowbite.service';
import { AuthService } from '../../services/auth.service';
import { UserSessionInfo } from '../../core/models/user';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',  // Usar templateUrl con "s"
  styleUrls: ['./sidebar.component.css'] 
})
export class SidebarComponent implements OnInit {
  userSession: UserSessionInfo | null = null;

  constructor(private flowbiteService: FlowbiteService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserSession();
    
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  }

  private loadUserSession() {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      this.userSession = {
        username: localStorage.getItem('userEmail') || '',
        role: localStorage.getItem('userRole') || '',
        // Si hay más datos en la respuesta del servidor, puedes agregarlos aquí
        name: parsedData.data?.name
      };
    }
  }

  getUserInitials(): string {
    const username = this.userSession?.username;
  
    // Verifica si username está definido y tiene un valor válido
    if (username) {
      return username
        .split('@')[0] // Toma solo la parte antes del @
        .substring(0, 2) // Toma los primeros dos caracteres
        .toUpperCase(); // Convierte a mayúsculas
    } else {
      return ''; // Si no hay un username, devuelve un valor vacío o lo que prefieras
    }
  }

  logOut(){
    this.authService.logout();
  }
}