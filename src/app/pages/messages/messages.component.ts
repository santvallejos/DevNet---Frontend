import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../../services/signal-r.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { UserSessionInfo } from '../../core/models/user';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, OnDestroy {
  userSession: UserSessionInfo | null = null;
  senderEmail: string = ''; // Cambia según el usuario actual
  receiverEmail = '';
  message = '';
  chatLog: { sender: string; message: string }[] = [];

  constructor(private flowbiteService: FlowbiteService,private messageHubService: SignalRService, private authService: AuthService) {
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

    this.messageHubService.onReceiveMessage((sender, message) => {
      this.chatLog.push({ sender, message });
    });

    this.messageHubService.onUserOffline(message => {
      alert(message);
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

  ngOnDestroy(): void {
    this.messageHubService.stopConnection();
  }

  sendMessage(): void {
    if (this.receiverEmail && this.message) {
      this.messageHubService.sendMessage(this.senderEmail, this.receiverEmail, this.message);
      this.chatLog.push({ sender: this.senderEmail, message: this.message });
      this.message = '';
    }
  }
}
