import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  senderEmail: string = '';
  hubConnection: signalR.HubConnection;
  private hubUrl = 'https://localhost:7224/MessageHub';


  constructor() {
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

    this.hubConnection.start()
      .then(() => console.log('connection started'))
        .then(result => {
          this.hubConnection.invoke('RegisterConnection', userEmail)
            .then(() => console.log(`Connection registered for ${userEmail}`))
              .catch(err => console.error('Error registering connection: ', err));
      })
      .catch(err => console.error('Error starting connection: ', err));
  }

  stopConnection(): void {
    this.hubConnection.stop().catch(err => console.error('Error stopping connection: ', err));
  }

  sendMessage(userEmail: string, receiverEmail: string, message: string): void {
    this.hubConnection.invoke('SendMessage', userEmail, receiverEmail, message)
      .catch(err => console.error('Error sending message: ', err));
  }

  onReceiveMessage(callback: (sender: string, message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  onUserOffline(callback: (message: string) => void): void {
    this.hubConnection.on('UserOffline', callback);
  }
}