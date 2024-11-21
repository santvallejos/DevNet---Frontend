import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginRequest} from '../../core/models/user';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  form!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false; //Activar el spinner 

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]],
    });
  }

  // cancelarSpinner(){
  //   setTimeout(() => {
  //     this.isLoading = false; // Desactivar el spinner después de unos segundos
  //   }, 3000); //3000 ms = 3 segundos
  // }

  onSubmit() {
    this.isLoading = true; // Activar el spinner
    var userData: LoginRequest = {
      username: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    };
    this.authService.login(userData).subscribe({
      next: res => {
        this.router.navigate(['pages/home']);
        this.isLoading = false;
      },
      error: er => {
        this.toastr.error('There was an error on login')
        this.isLoading = false;        
      }
    })
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

    // Función para redirigir a la página de recuperación de contraseña
    goToForgotPassword(): void {
      this.router.navigate(['auth/forgot-password']); // Ruta donde se encuentra la página de "Olvidé mi contraseña"
    }
}
