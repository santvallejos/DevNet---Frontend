import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { CommonModule } from '@angular/common';
/* Components ux/ui */
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { PublicationComponent } from '../publication/publication.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PublicationComponent, SidebarComponent,],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  isLoading: boolean = true;
  isCollapsed = false;
  private sidebarSubscription?: Subscription;
  sidebarService: any;

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  //Llamar al servicio
  ngOnInit(): void {
    // Simula un proceso de carga (puedes reemplazarlo por cualquier lógica de carga real)
    setTimeout(() => {
      this.isLoading = false;  // Oculta el spinner después de 2 segundos
    }, 2000);  // Simula 2 segundos de carga
    this.sidebarSubscription = this.sidebarService.isCollapsed$.subscribe(
      (      collapsed: boolean) => this.isCollapsed = collapsed
    );
  }
}
