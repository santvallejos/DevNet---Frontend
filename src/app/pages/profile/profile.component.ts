import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { FlowbiteService } from '../../services/flowbite.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { PublicationComponent } from "../publication/publication.component";
import { NgFor, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, PublicationComponent, NgIf, NgFor, NgForOf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  isLoading: boolean = true;
  currentUserId: string | null = null;
  constructor(
    private flowbiteService: FlowbiteService,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute // Inyectamos ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });

    // Capturamos el parámetro 'userid' de la URL
    this.route.params.subscribe(params => {
      const userId = params['userid']; // 'userid' es el nombre del parámetro en la ruta
      console.log('Captured userId:', userId); // Verificamos si el parámetro se captura correctamente

      if (this.isValidGUID(userId)) { // Verificamos si el userId es un GUID válido
        this.fetchUser(userId); // Llamamos a fetchUser solo si el GUID es válido
        this.currentUserId = userId;
      } else {
        console.error('Invalid userId format:', userId);
      }
    });
  }

  // Método para validar si el 'userId' es un GUID válido
  isValidGUID(userId: string): boolean {
    const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return guidPattern.test(userId);
  }

  fetchUser(userId: string): void {
    this.isLoading = true;
    console.log("Fetching user data for userId:", userId);

    // Llamamos al servicio para obtener el usuario basado en el userId
    this.userService.getUserById(userId).subscribe({
      next: (fetchedUser) => {
        console.log("Fetched user:", fetchedUser);

        if (fetchedUser) {
          const receivedUser = {
            username: fetchedUser.username,
            name: fetchedUser.name,
            lastname: fetchedUser.lastname,
            createdAt: fetchedUser.createdAt,
            profileImageUrl: fetchedUser.profileImageUrl  || 'assets/blank-profile.png',
            follows: Array.isArray(fetchedUser.follows) ? fetchedUser.follows.length : 0,
            followers: Array.isArray(fetchedUser.followers) ? fetchedUser.followers.length : 0
          };

          console.log("Received user:", receivedUser);
          this.user = receivedUser;
        }
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
