import { Component } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
/* component ux-ui */
import { SidebarComponent } from '../../core/sidebar/sidebar.component';
import { PublicationComponent } from '../../core/publication/publication.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, PublicationComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private flowbiteService: FlowbiteService) {}

  //Llamar al servicio
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
