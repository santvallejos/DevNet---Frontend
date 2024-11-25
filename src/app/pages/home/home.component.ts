import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { CommonModule } from '@angular/common';
/* Components ux/ui */
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { PublicationComponent } from '../publication/publication.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, PublicationComponent],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isLoading: boolean = true;

  constructor(private flowbiteService: FlowbiteService) {}

  //Llamar al servicio
  ngOnInit(): void {
    // Simula un proceso de carga (puedes reemplazarlo por cualquier lógica de carga real)
    setTimeout(() => {
      this.isLoading = false;  // Oculta el spinner después de 2 segundos
    }, 2000);  // Simula 2 segundos de carga
  }
}
