import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../core/models/user';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup; // Variable que almacenará el formulario reactivo.
  showPassword = false; // Variable para controlar la visibilidad de la contraseña.
  selectedFile: any; // Variable para almacenar la imagen seleccionada.

  constructor(private fb: FormBuilder, private route: Router, private authService: AuthService) {
    // Inicializa el formulario con validaciones en el constructor.
    this.form = this.fb.group({
      firstName: ['', Validators.required], // Primer nombre, obligatorio.
      lastName: ['', Validators.required], // Apellido, obligatorio.
      username: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.email]], // Correo electrónico con validación de formato.
      password: ['', [Validators.required, Validators.minLength(6)]], // Contraseña, con validación de mínimo de 6 caracteres.
      profilePicture: [null], // Almacenará la foto de perfil.
     // dateOfBirth: ['', Validators.required] // Fecha de nacimiento, obligatorio.
    });
  }

  /**
   * Método para alternar la visibilidad de la contraseña en el formulario.
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Método que se ejecuta cuando se selecciona un archivo de imagen (profilePicture).
   * Valida el tipo de archivo y, si es válido, lo carga como una imagen base64.
   * 
   * @param event Evento de selección de archivo.
   */
  onFileSelected(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado.
    // Validar el tipo de archivo (solo imágenes).
    if (file) {
      const fileType = file.type;
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']; // Tipos de archivo permitidos.

      if (allowedTypes.includes(fileType)) {
        const reader = new FileReader(); // Crear un lector de archivos.
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.selectedFile = e.target?.result; // Guardar el archivo leído como base64.
        };
        reader.readAsDataURL(file); // Leer el archivo como URL de datos.
      } else {
        alert('Solo se permiten imágenes en formato PNG, JPEG, JPG, WebP y GIF'); // Mensaje de error si el formato no es válido.
      }
    }
  }

  updateUsername() {
    const firstName = this.form.get('firstName')?.value;
    const lastName = this.form.get('lastName')?.value;

    if (firstName && lastName) {
      // Genera el nombre de usuario combinando el primer nombre y apellido.
      this.form.get('username')?.setValue(`${firstName.toLowerCase()}.${lastName.toLowerCase()}`, { emitEvent: false });
    }
  }


  /**
   * Método que maneja el envío del formulario de registro.
   * Valida que el formulario esté correcto y luego prepara los datos para enviarlos.
   */
  registerUser() {  
      // Crear el objeto userToRegister con los valores del formulario.
      const userToRegister: RegisterRequest = {
        name: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        username: this.form.get('username')?.value, 
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        profileImageUrl: this.form.get('profilePicture')?.value, // Si se seleccionó una foto, la añade. Si no, es null.
       // dateOfBirth: this.form.get('dateOfBirth')?.value
      };
      return this.authService.register(userToRegister);
    }
  
  

  /**
   * Método para redirigir al usuario a la página de inicio de sesión.
   */
  goToLogin() {
    this.route.navigate(['auth/login']); // Navegar a la ruta de inicio de sesión.
  }
}
