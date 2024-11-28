import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { FlowbiteService } from '../../services/flowbite.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { PublicationComponent } from "../publication/publication.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, PublicationComponent, NgIf, NgFor],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  isLoading: boolean = true;
  currentUserId: string | null = null;
  profileId: string = '';  // Renombramos userId a profileId
  profilePicture: string | undefined;
  sidebarCollapsed: boolean = false;

  constructor(private flowbiteService: FlowbiteService, private userService: UserService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });

    // Captura el 'id' de la URL usando paramMap
    this.route.paramMap.subscribe(params => {
      this.profileId = params.get('id') || '';  // Cambiamos userId a profileId
      console.log('User ID from URL:', this.profileId);

      if (this.isValidGUID(this.profileId)) { 
        this.fetchUser(this.profileId);
        this.currentUserId = this.profileId;
      } else {
        console.error('Invalid userId format:', this.profileId);
      }
    });

    this.profilePicture = this.authService.getProfilePicture();
  }

  isValidGUID(userId: string): boolean {
    const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return guidPattern.test(userId);
  }

  fetchUser(userId: string): void {
    this.isLoading = true;
    console.log("Fetching user data for userId:", userId);

    this.userService.getUserById(userId).subscribe({
      next: (fetchedUser) => {
        console.log("Fetched user:", fetchedUser);

        if (fetchedUser) {
          const receivedUser = {
            username: fetchedUser.username,
            name: fetchedUser.name,
            lastname: fetchedUser.lastname,
            createdAt: fetchedUser.createdAt,
            profileImageUrl: fetchedUser.profileImageUrl || 'assets/blank-profile.png',
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

  onSidebarStateChange(isCollapsed: boolean): void {
    this.sidebarCollapsed = isCollapsed;
  }

}
