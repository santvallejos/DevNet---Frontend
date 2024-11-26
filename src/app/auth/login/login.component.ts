import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../core/models/user';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Verificar autenticación al iniciar el componente
    // if (this.authService.isLogged()) {
    //   this.router.navigate(['/pages/home']);
    //   return;
    // }
    if (this.authService.isLogged()) {
      return;  // Evita la redirección adicional aquí
    }

    // Inicializar el formulario
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required
      ]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      
      const userData: LoginRequest = {
        username: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      };

      this.authService.login(userData).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.router.navigate(['/pages/home']);
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error('There was an error on login');
          console.error('Login error:', err);
        }
      });
    } else {
      this.toastr.error('Please check the form fields');
    }
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToForgotPassword(): void {
    this.router.navigate(['auth/forgot-password']);
  }
}