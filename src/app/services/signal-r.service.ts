import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: signalR.HubConnection;
  private baseUrl = 'https://f1a1-181-88-211-147.ngrok-free.app/MessageHub'; // Cambiar por la URL de tu API

  constructor(private http: HttpClient) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/chatHub`)
      .build();
  }

  startConnection(): void {
    this.connection
      .start()
      .catch((err) => console.error('Error starting SignalR connection:', err));
  }

  stopConnection(): void {
    this.connection.stop();
  }

  sendMessage(sender: string, receiver: string, message: string): void {
    this.connection.invoke('SendMessage', sender, receiver, message).catch((err) => console.error(err));
  }

  onReceiveMessage(callback: (sender: string, message: string) => void): void {
    this.connection.on('ReceiveMessage', callback);
  }

  getChatHistory(sender: string, receiver: string): Observable<{ sender: string; message: string }[]> {
    return this.http.get<{ sender: string; message: string }[]>(
      `${this.baseUrl}/chat/history?sender=${sender}&receiver=${receiver}`
    );
  }
}
