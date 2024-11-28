import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlowbiteService } from '../../services/flowbite.service';
import { AuthService } from '../../services/auth.service';
import { UserSessionInfo } from '../../core/models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-sidebar',
   standalone: true,
   imports: [CommonModule, RouterModule],
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
   userSession: UserSessionInfo | null = null;
   @Output() sidebarStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
   userId: string = '';
   isCollapsed: boolean = false;

   constructor(
     private flowbiteService: FlowbiteService,
     private authService: AuthService,
     private router: Router,
     private toastr: ToastrService
   ) {}

   ngOnInit(): void {
     // Load sidebar state from local storage, defaulting to false
     this.isCollapsed = JSON.parse(localStorage.getItem('sidebarCollapsed') || 'false');
     
     this.loadUserSession();
     this.flowbiteService.loadFlowbite(flowbite => {
       console.log('Flowbite loaded', flowbite);
     });
     this.userId = this.authService.getCurrentUserId();
   }

   toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarStateChange.emit(this.isCollapsed); // Emitir el estado
    localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed)); // Guardar en localStorage
  }
  

   private loadUserSession() {
     const sessionData = localStorage.getItem('userSession');
     if (sessionData) {
       try {
         const parsedData = JSON.parse(sessionData);
         this.userSession = {
           username: localStorage.getItem('userEmail') || '',
           role: localStorage.getItem('userRole') || '',
           name: parsedData.data?.name || ''
         };
       } catch (error) {
         console.error('Error parsing user session data', error);
       }
     }
   }

   getUserInitials(): string {
     const username = this.userSession?.username;
     if (username) {
       return username
         .split('@')[0]
         .substring(0, 2)
         .toUpperCase();
     }
     return '';
   }

   logOut() {
     if (confirm('Estás seguro de que quieres cerrar sesión?')) {
       this.authService.logout();
       localStorage.removeItem('userSession');
       localStorage.removeItem('userEmail');
       localStorage.removeItem('userRole');
       this.router.navigate(['/login']);
     }
   }

   messages() {
     this.router.navigate(['pages/messages']);
   }

   home() {
     this.router.navigate(['pages/home']);
   }

   profile() {
     const userId = this.authService.getCurrentUserId();
     if (userId) {
       this.router.navigate([`/pages/profile/${userId}`]);
     } else {
       this.toastr.error('No se pudo encontrar el usuario.');
     }
   }
}