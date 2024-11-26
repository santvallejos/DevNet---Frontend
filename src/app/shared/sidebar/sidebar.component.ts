// src/app/shared/sidebar/sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowbiteService } from '../../services/flowbite.service';
import { AuthService } from '../../services/auth.service';
import { UserSessionInfo } from '../../core/models/user';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userSession: UserSessionInfo | null = null;
  isCollapsed = false; // Añadido el estado del sidebar
  
  constructor(
    private flowbiteService: FlowbiteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserSession();
    this.isCollapsed = JSON.parse(localStorage.getItem('isCollapsed') || 'false');
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  }
  

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    console.log('Sidebar toggled:', this.isCollapsed); // Para debugging
    
    // Cambiar clases de la imagen según el estado del sidebar
    const sidebarElement = document.querySelector('aside');
    if (sidebarElement) {
      if (this.isCollapsed) {
        sidebarElement.classList.add('sidebar-collapsed');
        sidebarElement.classList.remove('sidebar-expanded');
      } else {
        sidebarElement.classList.add('sidebar-expanded');
        sidebarElement.classList.remove('sidebar-collapsed');
      }
    }
  }
  
  

  // Cargar los datos del usuario desde localStorage
  private loadUserSession() {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      this.userSession = {
        username: localStorage.getItem('userEmail') || '',
        role: localStorage.getItem('userRole') || '',
        name: parsedData.data?.name || ''
      };
    }
  }

  // Obtener las iniciales del nombre de usuario
  getUserInitials(): string {
    const username = this.userSession?.username;
    if (username) {
      return username
        .split('@')[0]
        .substring(0, 2)
        .toUpperCase();
    }
    return '';
  }

  // Método para cerrar sesión
  logOut() {
    this.authService.logout();
    localStorage.removeItem('userSession');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  }
}