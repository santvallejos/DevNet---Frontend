import { Component } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
/* component ux-ui */





@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent ],
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
