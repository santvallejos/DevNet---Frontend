import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../../services/signal-r.service';
import { User, UserSessionInfo } from '../../core/models/user';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, OnDestroy {
  userSession: UserSessionInfo | null = null;
  connectedUsers: string[] = [];
  selectedUser: string | null = null;
  senderEmail: string = ''; // Cambia según el usuario actual
  receiverEmail = ''; //Segun el usuario que se elija que este conectado
  selectedUserInfo: string | null = null;
  message = '';
  chatLog: { sender: string; message: string }[] = [];

  isCollapsed = false;

  constructor(private flowbiteService: FlowbiteService, public messageHubService: SignalRService, private authService: AuthService) {
    // Obtiene el email del usuario desde localStorage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.senderEmail = userEmail; // Asigna el email al senderEmail
    } else {
      console.warn('No user email found in localStorage.');
    }
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });

    this.loadUserSession();

    //Escuchar los mensajes entrantes
    this.messageHubService.onReceiveMessage((sender, message) => {
      if (sender != this.receiverEmail) {
        alert(`Te ah mandado un mensaje ${sender}`);
      }
      else {
        this.chatLog.push({ sender, message });
      }
    });

    //alerta de que si el usuario esta desconectado
    this.messageHubService.onUserOffline(message => {
      alert(message);
    });

    //Lista de usuarios conectados
    this.connectedUsers = this.messageHubService.getUsers();

    // Opcional: Actualizar la lista en tiempo real
    setInterval(() => {
      this.connectedUsers = this.messageHubService.getUsers();
    }, 1000); // Actualiza cada segundo
  }

  ngOnDestroy(): void {
    //Desconexion de un usuario
    this.messageHubService.stopConnection();
  }

  //Cargar el usuario 
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

  //Deslogea un usuario
  logOut() {
    this.authService.logout();
    localStorage.removeItem('userSession');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  }

  //Visual del Sidebar
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

  //Envia un mensaje
  sendMessage(): void {
    // Verifica si el usuario está en la lista de usuarios conectados
    if (this.connectedUsers.includes(this.receiverEmail)) {
      // El usuario está conectado, envía el mensaje
      this.messageHubService.sendMessage(this.senderEmail, this.receiverEmail, this.message);
      this.chatLog.push({ sender: this.senderEmail, message: this.message });
      this.message = '';
    } else {
      // El usuario no está conectado, muestra una notificación
      alert(`El usuario ${this.receiverEmail} no está conectado. No se puede enviar el mensaje.`);
      this.message = '';
    }
  }

  receiverUser(receiverEmail: string): void {
    if (this.receiverEmail == "") {
      this.receiverEmail = receiverEmail;
      // Actualiza información del usuario seleccionado
      this.selectedUserInfo = `${receiverEmail}`;
    }
    else {
      if (this.receiverEmail != receiverEmail) {
        this.chatLog = [];
        this.receiverEmail = receiverEmail;
        // Actualiza información del usuario seleccionado
        this.selectedUserInfo = `${receiverEmail}`;
      }
    }
  }
}