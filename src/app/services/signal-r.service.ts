import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  //correo del usuario
  senderEmail: string = '';
  hubConnection: signalR.HubConnection;
  private hubUrl = 'https://7666-181-88-211-147.ngrok-free.app/MessageHub'; //https://localhost:7224/MessageHub';                    
  //Lista de usuarios conectados
  connectedUsers: string[] = [];
  receiverEmail: string = "";

  constructor() {
    //Declara donde conectarse
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    // Obtiene el email del usuario desde localStorage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.senderEmail = userEmail; // Asigna el email al senderEmail
    } else {
      console.warn('No user email found in localStorage.');
    }

    //Inicia la conexion
    this.hubConnection.start()
      .then(() => console.log('connection started'))
        .then(result => {
          this.hubConnection.invoke('RegisterConnection', userEmail)
            .then(() => console.log(`Connection registered for ${userEmail}`))
              .catch(err => console.error('Error registering connection: ', err));
      })
      .catch(err => console.error('Error starting connection: ', err));

      this.addListeners();
  }

  

  //Detener la conexion
  stopConnection(): void {
    this.hubConnection.stop().catch(err => console.error('Error stopping connection: ', err));
  }

  //Función principal de mandar un mensaje
  sendMessage(userEmail: string, receiverEmail: string, message: string): void {
    this.hubConnection.invoke('SendMessage', userEmail, receiverEmail, message)
      .catch(err => console.error('Error sending message: ', err));
  }

  //Escuchar los mensajes entrantes
  onReceiveMessage(callback: (sender: string, message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  //Notificar que un usuario se desconecto
  onUserOffline(callback: (message: string) => void): void {
    this.hubConnection.on('UserOffline', callback);
  }

  //Actualizar la lista de usuarios conectados
  private addListeners() {
    this.hubConnection.on('UpdateUserList', (users: string[]) => {
      this.connectedUsers = users;
    });
  }

  //Enviar la lista a los componentes
  getUsers(): string[] {
    return this.connectedUsers;
  }
}