import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
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
  }

  startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error starting connection: ', err));
  }

  askServer() {
    this.hubConnection.invoke("askServer", "hey")
    .catch(err => console.error(err))
  }

  askServerListener(){
    this.hubConnection.on("askServerResponse", (someText) => {
      console.log(someText);
    })
  }
}
