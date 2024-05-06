import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ILoginData } from '../../core/models/login-data';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor(public authService: AuthService) {

  }

  login(form: any) {
    if (form.valid) {
      const formData: ILoginData = form.value;
      this.authService.login(formData);
    }
  }
}
