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
  sidebarCollapsed: boolean = false;
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
    // Recuperar el estado del sidebar desde localStorage
    const storedState = localStorage.getItem('sidebarCollapsed');
    this.sidebarCollapsed = storedState ? JSON.parse(storedState) : false;
  
    // Simula el spinner de carga
    setTimeout(() => {
      this.isLoading = false; 
    }, 2000);
  }
  
  onSidebarStateChange(isCollapsed: boolean): void {
    this.sidebarCollapsed = isCollapsed;
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed)); // Guardar estado
  }
  
}
