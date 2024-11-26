import { Component } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
/* Components ux-ui */


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [SidebarComponent],
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
