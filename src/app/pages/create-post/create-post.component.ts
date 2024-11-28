import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { PublicationComponent } from '../publication/publication.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../core/models/publication';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule, 
    PublicationComponent, 
    SidebarComponent,
    FormsModule,
    CKEditorModule
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy {
  public Editor: any;
  postContent: string = '';
  isLoading: boolean = true;
  sidebarCollapsed: boolean = false;
  private sidebarSubscription?: Subscription;
  mediaUrl: string | null = null; 
 

  constructor( private postService: PostService, private toastr: ToastrService, private router: Router) {}

  async ngOnInit() {
    // Cargar CKEditor de forma asíncrona
    if (typeof window !== 'undefined') {
      try {
        const module = await import('@ckeditor/ckeditor5-build-classic');
        this.Editor = module.default;
        this.toastr.info('Editor de texto cargado correctamente', 'Información');
      } catch (error) {
        console.error('Error loading CKEditor:', error);
        this.toastr.error('No se pudo cargar el editor de texto', 'Error');
      }
    }

    // Recuperar el estado del sidebar desde localStorage
    const storedState = localStorage.getItem('sidebarCollapsed');
    this.sidebarCollapsed = storedState ? JSON.parse(storedState) : false;
    
    // Simula el spinner de carga
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    // Desuscribirse del servicio si es necesario
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  // Método para cambiar el estado del sidebar
  onSidebarStateChange(isCollapsed: boolean): void {
    this.sidebarCollapsed = isCollapsed;
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed)); // Guardar estado
  }

  submitPost() {
    // Verificar que haya contenido en el post
    if (!this.postContent || this.postContent.trim() === '') {
      console.error('El contenido del post está vacío.');
      return;
    }
    debugger
    // Obtener el userId del usuario logueado desde el localStorage o sessionStorage
    const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');  
    const id = userSession.data?.userId;
  
  
    // Crear el objeto post con los datos
    const postToSubmit: Post = {
      userId: id, // El ID del usuario logueado
      text: this.postContent, // El contenido del post desde CKEditor
      mediaUrl: this.mediaUrl || null,
    };
  
    console.log('Datos del post a enviar:', postToSubmit);
  
    // Llamar al servicio para crear el post
    this.postService.createPost(postToSubmit)?.subscribe({
      next: (response) => {
        console.log('Post creado con éxito:', response);
        this.goToHome(); // Redirigir a la página de inicio o donde desees
      },
      error: (err) => {
        console.error('Error al crear el post:', err);
      },
    });
  }

  goToHome() {
    this.router.navigate(['pages/post']);
  }
  
}
