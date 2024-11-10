import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  showPassword = false;
  selectedFile: any;
 

  constructor(private fb: FormBuilder, private route: Router) {
    // Inicializar el formulario en el constructor
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profilePicture: [null],
      dateOfBirth: ['', Validators.required] // Agregar el control de fecha de nacimiento
    });
  }

  ngOnInit(): void {
    // Cualquier lógica adicional de inicialización
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        this.selectedFile = reader.result; // Asignar la imagen leída a selectedFile
      };
      
      reader.readAsDataURL(file); // Leer el archivo como URL de datos
    }
  }

 
  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      const formValue = this.form.value;
      
      formData.append('firstName', formValue.firstName);
      formData.append('lastName', formValue.lastName);
      formData.append('email', formValue.email);
      formData.append('password', formValue.password);
      formData.append('dateOfBirth', formValue.dateOfBirth); // Agregar fecha de nacimiento
      
      if (this.selectedFile) {
        // formData.append('profilePicture', this.selectedFile);
      }

      // Llamada al servicio para registrar
      // this.authRegisterService.register(formData).subscribe({
      //   next: (response: any) => {
      //     console.log('Registration successful', response);
      //   },
      //   error: (error: any) => {
      //     console.error('Registration failed', error);
      //   }
      // })
  }
  }

 goToLogin(){
  this.route.navigate(['/'])
 }

 

}
