import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { CommonModule} from '@angular/common';
import { SignalRService } from '../../services/signal-r.service';
/* Components ux-ui */
import { SidebarComponent } from '../../core/sidebar/sidebar.component';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit, OnDestroy{



  constructor(private flowbiteService: FlowbiteService, private signalR: SignalRService) {}

  //Llamar al servicio
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    this.signalR.startConnection();

    setTimeout(() => {
      this.signalR.askServerListener();
      this.signalR.askServer();
    }, 2000)
  }

  ngOnDestroy(){
    this.signalR.hubConnection.off("askServerResponse");
  }
}
