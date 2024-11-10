import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
/* Components ux-ui */
import { SidebarComponent } from '../../core/sidebar/sidebar.component';
import { ButtonNavegationComponent } from '../../core/button-navegation/button-navegation.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [SidebarComponent, ButtonNavegationComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  constructor(private flowbiteService: FlowbiteService) {}

  //Llamar al servicio
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
