// Importaciones necesarias
import { Injectable } from '@angular/core';  
import { BehaviorSubject } from 'rxjs';     

/**
 * Servicio que maneja el estado de colapso del sidebar (barra lateral).
 * Permite obtener y modificar el estado de si el sidebar está colapsado o expandido.
 */
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class SidebarService {
  // Private BehaviorSubject para gestionar el estado del sidebar (expandido o colapsado)
  // El estado inicial es 'false', lo que significa que el sidebar no está colapsado.
  private isCollapsedSubject = new BehaviorSubject<boolean>(false);

  /**
   * Exposición del estado del sidebar como un Observable.
   * Los componentes pueden suscribirse a 'isCollapsed$' para recibir actualizaciones sobre el estado del sidebar.
   */
  isCollapsed$ = this.isCollapsedSubject.asObservable();

  /**
   * Método que alterna el estado del sidebar.
   * Si el sidebar está expandido, lo colapsa. Si está colapsado, lo expande.
   */
  toggleSidebar() {
    // Invertir el estado actual y emitirlo como el nuevo valor.
    this.isCollapsedSubject.next(!this.isCollapsedSubject.value);
  }

  /**
   * Método que devuelve el valor actual del estado del sidebar.
   * No requiere suscripción, simplemente devuelve el estado almacenado en el BehaviorSubject.
   */
  getCollapsedState() {
    return this.isCollapsedSubject.value;
  }
}
