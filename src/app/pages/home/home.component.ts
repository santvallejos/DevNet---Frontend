import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
/* Components ux/ui */
import { SidebarComponent } from '../../core/sidebar/sidebar.component';
import { PublicationComponent } from '../../core/publication/publication.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, PublicationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private flowbiteService: FlowbiteService) {}

  //Llamar al servicio
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
