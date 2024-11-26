// Importaciones necesarias
import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';      
import { FlowbiteService } from '../../services/flowbite.service';  
import { AuthService } from '../../services/auth.service';          
import { UserSessionInfo } from '../../core/models/user';           

/**
 * Componente para la barra lateral (sidebar) de la aplicación.
 * Permite controlar el estado del sidebar (colapsado/expandido), mostrar información del usuario y gestionar la sesión.
 */
@Component({
  selector: 'app-sidebar',  
  standalone: true,         // Este componente es independiente y no depende de otros módulos
  imports: [CommonModule],  // Importa CommonModule para funcionalidades de Angular comunes
  templateUrl: './sidebar.component.html',  
  styleUrls: ['./sidebar.component.css']   
})
export class SidebarComponent implements OnInit {
  userSession: UserSessionInfo | null = null;  // Información del usuario cargada desde localStorage
  isCollapsed = false;  // Estado del sidebar, por defecto está expandido
  
  /**
   * Constructor para inyectar dependencias en el componente
   * @param flowbiteService Servicio para cargar Flowbite (UI framework)
   * @param authService Servicio para gestionar la autenticación del usuario
   */
  constructor(private flowbiteService: FlowbiteService, private authService: AuthService) {}

  /**
   * Método de ciclo de vida de Angular, llamado cuando el componente se inicializa.
   * Aquí se cargan los datos de sesión del usuario y se inicializa el estado del sidebar.
   */
  ngOnInit(): void {
    // Cargar los datos de la sesión del usuario desde localStorage
    this.loadUserSession();
    
    // Obtener el estado del sidebar desde localStorage (si está guardado previamente)
    this.isCollapsed = JSON.parse(localStorage.getItem('isCollapsed') || 'false');
    
    // Cargar Flowbite (UI framework) si está disponible
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);  // Mostrar en consola si Flowbite se cargó correctamente
    });
  }
  
  /**
   * Método para alternar entre los estados colapsado y expandido del sidebar.
   * Cambia las clases del sidebar en el DOM (Modelo de Objeto del Documento) para reflejar el cambio de estado.
   */
  toggleSidebar() {
    // Invertir el valor de 'isCollapsed' (colapsado/expandido)
    this.isCollapsed = !this.isCollapsed;
    console.log('Sidebar toggled:', this.isCollapsed);  // Para debugging

    // Cambiar las clases CSS del sidebar según su estado
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
  
  /**
   * Cargar la información de la sesión del usuario desde localStorage.
   * Si no hay datos en localStorage, no se carga nada.
   */
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

  /**
   * Obtener las iniciales del nombre de usuario para mostrarlas en la interfaz.
   * @returns Un string con las iniciales del nombre de usuario (primeras dos letras antes del '@').
   */
  getUserInitials(): string {
    const username = this.userSession?.username;
    if (username) {
      return username
        .split('@')[0]  // Obtener la parte del username antes del '@'
        .substring(0, 2)  // Obtener las dos primeras letras
        .toUpperCase();  // Convertir a mayúsculas
    }
    return '';  // Retornar vacío si no hay un nombre de usuario
  }

  /**
   * Método para cerrar sesión. Llama al servicio de autenticación y limpia los datos del usuario en localStorage.
   */
  logOut() {
    this.authService.logout();  // Llamar al método de logout del servicio de autenticación
    // Eliminar los datos de sesión del usuario de localStorage
    localStorage.removeItem('userSession');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  }
}
