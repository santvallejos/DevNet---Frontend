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
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, OnDestroy {
  senderEmail: string = ''; // Cambia según el usuario actual
  receiverEmail = '';
  message = '';
  chatLog: { sender: string; message: string }[] = [];

  constructor(private messageHubService: SignalRService, private authService: AuthService) {
    // Obtiene el email del usuario desde localStorage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.senderEmail = userEmail; // Asigna el email al senderEmail
    } else {
      console.warn('No user email found in localStorage.');
    }
  }

  ngOnInit(): void {

    this.messageHubService.onReceiveMessage((sender, message) => {
      this.chatLog.push({ sender, message });
    });

    this.messageHubService.onUserOffline(message => {
      alert(message);
    });
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
