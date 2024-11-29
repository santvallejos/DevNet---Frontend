import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../core/models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  showPassword = false;
  selectedFile: any;

  constructor(private fb: FormBuilder, private route: Router, private authService: AuthService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profilePicture: [null],
    });

    // Actualizar username cuando cambien los campos de nombre o apellido
    this.form.get('firstName')?.valueChanges.subscribe(() => this.updateUsername());
    this.form.get('lastName')?.valueChanges.subscribe(() => this.updateUsername());
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

      if (allowedTypes.includes(fileType)) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const base64 = e.target?.result as string;
          const fileExtension = fileType.split('/')[1];
          this.selectedFile = `data:image/${fileExtension};base64,${base64.split(',')[1]}`;
          this.form.get('profilePicture')?.setValue(this.selectedFile);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Solo se permiten imágenes en formato PNG, JPEG, JPG, WebP y GIF');
      }
    }
  }

  updateUsername() {
    const firstName = this.form.get('firstName')?.value;
    const lastName = this.form.get('lastName')?.value;
    if (firstName && lastName) {
      this.form
        .get('username')
        ?.setValue(`${firstName.toLowerCase()}.${lastName.toLowerCase()}`, { emitEvent: false });
    }
  }

  registerUser() {
    if (this.form.invalid) {
      console.error('El formulario no es válido:', this.form.errors);
      return;
    }

    const userToRegister: RegisterRequest = {
      name: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      username: this.form.get('username')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      profileImageUrl: this.form.get('profilePicture')?.value || null,
    };

    console.log('Datos del usuario a registrar:', userToRegister);

    this.authService.register(userToRegister).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito:', response);
        this.goToLogin();
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
      },
    });
  }

  goToLogin() {
    this.route.navigate(['pages/home']);
  }

  
}
