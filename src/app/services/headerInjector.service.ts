import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeaderInjector {
  constructor() {}

  /**
   * Genera un HttpHeaders con los encabezados necesarios, incluyendo el token Bearer.
   * @returns HttpHeaders con los encabezados generados.
   * @throws Error si no se encuentra el token.
   */
  injectHeader(): HttpHeaders {
    const sessionData = localStorage.getItem('userSession');

    // Verifica si existe la sesión
    if (!sessionData) {
      throw new Error('No user session found.');
    }

    try {
      // Intenta parsear el JSON almacenado
      const parsedData = JSON.parse(sessionData);

      // Accede al token dentro del objeto parseado
      const token = parsedData?.data?.token;

      // Verifica si el token existe
      if (!token) {
        throw new Error('Bearer token is missing.');
      }
      console.log("token: " + token);
      // Crea y retorna los encabezados
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      });
    } catch (error) {
      // Manejo de errores si el JSON no es válido
      console.error('Failed to parse session data:', error);
      throw new Error('Invalid session data format.');
    }
  }
}
