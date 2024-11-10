import { Component } from '@angular/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  email: string = '';  // Asegúrate de declarar la propiedad "email" aquí

  onSubmit() {
    // Aquí puedes manejar el envío del formulario
    console.log(this.email);
  }
}
