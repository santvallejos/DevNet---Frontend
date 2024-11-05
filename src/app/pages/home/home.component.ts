import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/header/header.component';
import { SidebarLeftComponent } from '../../core/sidebar-left/sidebar-left.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarLeftComponent],
  templateUrl: './home.component.html', //archivo HTML externo
  styles: [] 
})

export class HomeComponent {
  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    const sidebar = document.querySelector('app-sidebar-left') as HTMLElement;
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full', !this.sidebarVisible);
    }
  }
}



