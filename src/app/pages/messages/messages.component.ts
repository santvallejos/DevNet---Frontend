import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  senderEmail: string = '';
  receiverEmail = '';
  message = '';
  chatLog: { sender: string; message: string }[] = [];
  isCollapsed = false;
  sidebarCollapsed: boolean = false;

  constructor(
    private messageHubService: SignalRService,
    private authService: AuthService
  ) {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.senderEmail = userEmail;
    }
  }

  ngOnInit(): void {
    // Establecer conexión con el servidor SignalR
    this.messageHubService.onReceiveMessage((sender, message) => {
      this.chatLog.push({ sender, message });
    });

    // Cargar mensajes iniciales desde la base de datos
    this.loadChatHistory();
  }

  sendMessage(): void {
    if (this.receiverEmail && this.message) {
      this.messageHubService.sendMessage(
        this.senderEmail,
        this.receiverEmail,
        this.message
      );

      this.chatLog.push({ sender: this.senderEmail, message: this.message });
      this.message = '';
    }
  }

  ngOnDestroy(): void {
    this.messageHubService.stopConnection();
  }

  onSidebarStateChange(isCollapsed: boolean): void {
    this.sidebarCollapsed = isCollapsed;
  }

  private loadChatHistory(): void {
    this.messageHubService.getChatHistory(this.senderEmail, this.receiverEmail).subscribe({
      next: (messages) => {
        this.chatLog = messages;
      },
      error: (err) => {
        console.error('Error loading chat history:', err);
      },
    });
  }
}
